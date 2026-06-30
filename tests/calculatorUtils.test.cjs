const assert = require("node:assert/strict");
const test = require("node:test");

const {
  calculateBonusProjection,
  formatCashbackRate,
  formatCurrency,
  parseWeeklyBetAmount,
  sanitizeWeeklyBetAmountInput,
} = require("../.test-build/src/utils/calculatorUtils.js");

test("calculateBonusProjection returns monthly and yearly cashback from weekly play and rate", () => {
  const cases = [
    {
      expected: { monthlyCashback: 2, yearlyCashback: 24 },
      input: {
        cashbackRate: 0.005,
        maxMonthlyCashbackCap: 1000,
        weeklyBetAmount: 100,
      },
      name: "straight bet",
    },
    {
      expected: { monthlyCashback: 96, yearlyCashback: 1152 },
      input: {
        cashbackRate: 0.024,
        maxMonthlyCashbackCap: 1000,
        weeklyBetAmount: 1000,
      },
      name: "2-leg parlay",
    },
    {
      expected: { monthlyCashback: 800, yearlyCashback: 9600 },
      input: {
        cashbackRate: 0.04,
        maxMonthlyCashbackCap: 1000,
        weeklyBetAmount: 5000,
      },
      name: "3-leg+ parlay below cap",
    },
  ];

  for (const { expected, input, name } of cases) {
    assert.deepEqual(
      calculateBonusProjection(
        input.weeklyBetAmount,
        input.cashbackRate,
        input.maxMonthlyCashbackCap,
      ),
      expected,
      name,
    );
  }
});

test("calculateBonusProjection applies the monthly cashback cap before yearly projection", () => {
  const projection = calculateBonusProjection(100000, 0.04, 1000);

  assert.deepEqual(projection, {
    monthlyCashback: 1000,
    yearlyCashback: 12000,
  });
});

test("calculateBonusProjection supports custom monthly caps", () => {
  assert.deepEqual(calculateBonusProjection(25000, 0.04, 500), {
    monthlyCashback: 500,
    yearlyCashback: 6000,
  });

  assert.deepEqual(calculateBonusProjection(25000, 0.04, 2500), {
    monthlyCashback: 2500,
    yearlyCashback: 30000,
  });
});

test("calculateBonusProjection handles exact cap boundaries and zero values", () => {
  assert.deepEqual(calculateBonusProjection(6250, 0.04, 1000), {
    monthlyCashback: 1000,
    yearlyCashback: 12000,
  });

  assert.deepEqual(calculateBonusProjection(0, 0.04, 1000), {
    monthlyCashback: 0,
    yearlyCashback: 0,
  });

  assert.deepEqual(calculateBonusProjection(1000, 0, 1000), {
    monthlyCashback: 0,
    yearlyCashback: 0,
  });
});

test("calculateBonusProjection keeps very small positive projections", () => {
  assert.deepEqual(calculateBonusProjection(0.01, 0.005, 1000), {
    monthlyCashback: 0,
    yearlyCashback: 0,
  });

  assert.deepEqual(calculateBonusProjection(0.25, 0.04, 1000), {
    monthlyCashback: 0.04,
    yearlyCashback: 0.48,
  });
});

test("calculateBonusProjection rounds currency to cents", () => {
  assert.deepEqual(calculateBonusProjection(333.33, 0.005, 1000), {
    monthlyCashback: 6.67,
    yearlyCashback: 80,
  });

  assert.deepEqual(calculateBonusProjection(1234.56, 0.024, 1000), {
    monthlyCashback: 118.52,
    yearlyCashback: 1422.21,
  });
});

test("formatCashbackRate renders percentage labels with two decimals", () => {
  const cases = [
    [-0.005, "-0.50%"],
    [0, "0.00%"],
    [0.0001, "0.01%"],
    [0.005, "0.50%"],
    [0.024, "2.40%"],
    [0.04, "4.00%"],
    [0.12345, "12.35%"],
    [1, "100.00%"],
  ];

  for (const [rate, expected] of cases) {
    assert.equal(formatCashbackRate(rate), expected);
  }
});

test("formatCurrency formats whole-dollar currency labels", () => {
  const cases = [
    [0, "USD", "$0"],
    [12.49, "USD", "$12"],
    [12.5, "USD", "$13"],
    [1000, "USD", "$1,000"],
    [1234567, "USD", "$1,234,567"],
    [-42, "USD", "-$42"],
    [1000, "EUR", "€1,000"],
    [1000, "CAD", "CA$1,000"],
    [1000, "GBP", "£1,000"],
  ];

  for (const [value, currency, expected] of cases) {
    assert.equal(formatCurrency(value, currency), expected);
  }
});

test("parseWeeklyBetAmount accepts valid money-like input", () => {
  const cases = [
    ["1", 1],
    ["001", 1],
    ["300", 300],
    ["$300", 300],
    [" 1,234.56 ", 1234.56],
    ["$ 0.01", 0.01],
    ["\t$9,876\n", 9876],
    ["000.50", 0.5],
    ["1e3", 1000],
  ];

  for (const [value, expected] of cases) {
    assert.equal(parseWeeklyBetAmount(value), expected);
  }
});

test("parseWeeklyBetAmount rejects empty, invalid, zero, and negative input", () => {
  const cases = [
    "",
    " ",
    "$",
    ".",
    "abc",
    "1.2.3",
    "0",
    "0.00",
    "-1",
    "-100",
    "Infinity",
    "-Infinity",
    "NaN",
    "null",
    "undefined",
  ];

  for (const value of cases) {
    assert.equal(parseWeeklyBetAmount(value), null, value);
  }
});

test("sanitizeWeeklyBetAmountInput keeps only digits and one decimal point", () => {
  const cases = [
    ["", ""],
    ["300", "300"],
    ["$300", "300"],
    ["$1,234.56", "1234.56"],
    ["abc123def", "123"],
    ["12.3.4.5", "12.345"],
    [".50", ".50"],
    ["..1", ".1"],
    ["-42", "42"],
    [" 9 8 7 ", "987"],
    ["$0.00/week", "0.00"],
    ["1e3", "13"],
    ["$1,2,3,4", "1234"],
    ["abc.12def.34ghi", ".1234"],
    ["000.500", "000.500"],
  ];

  for (const [value, expected] of cases) {
    assert.equal(sanitizeWeeklyBetAmountInput(value), expected, value);
  }
});

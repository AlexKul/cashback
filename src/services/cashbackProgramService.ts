import type { CashbackProgram } from "@/models/calculator";

type CashbackProgramFile = {
  program_name: string;
  currency: string;
  max_monthly_cashback_cap: number;
  period: "monthly";
  tiers: {
    id: string;
    label: string;
    rate: number;
  }[];
};

const localCashbackProgram =
  require("../../assets/json/cashbackProgram.json") as CashbackProgramFile;

export async function fetchCashbackProgram(): Promise<CashbackProgram> {
  return {
    currency: localCashbackProgram.currency,
    maxMonthlyCashbackCap: localCashbackProgram.max_monthly_cashback_cap,
    period: localCashbackProgram.period,
    programName: localCashbackProgram.program_name,
    tiers: localCashbackProgram.tiers.map((tier) => ({
      cashbackRate: tier.rate,
      id: tier.id,
      label: tier.label,
    })),
  };
}

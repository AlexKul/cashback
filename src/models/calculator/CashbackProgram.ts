import type { BetType } from "./BetType";

export type CashbackProgram = {
  currency: string;
  maxMonthlyCashbackCap: number;
  period: "monthly";
  programName: string;
  tiers: BetType[];
};

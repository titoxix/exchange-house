import { Balance as BalanceDB } from "@prisma/client";
import { Balance } from "@/interfaces/balance";
import { formatDateLatam } from "@/utils/dates";

export const adapterDataToFront = (balance: BalanceDB): Balance => {
  return {
    id: balance.id,
    pesosAmount: balance.pesosAmount,
    usdAmount: balance.usdAmount,
    pesosInitialAmount: balance.pesosInitialAmount,
    usdInitialAmount: balance.usdInitialAmount,
    state: balance.state,
    createdAt: formatDateLatam(balance.createdAt),
  };
};

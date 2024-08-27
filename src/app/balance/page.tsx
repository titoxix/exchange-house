import { getBalanceOpenedByDate } from "@/server/balance";
import BalanceForm from "@/components/BalanceForm";
import CloseBalance from "@/components/CloseBalance";
import { getCurrentDate } from "@/utils/dates";
import { Balance } from "@/interfaces/balance";

async function getData(): Promise<Balance | null> {
  try {
    const currentDate = getCurrentDate("yyyy-mm-dd");
    const balanceDayResult = await getBalanceOpenedByDate(currentDate);

    if (!balanceDayResult) {
      return null;
    }
    return {
      id: balanceDayResult.id,
      pesosAmount: balanceDayResult.pesosAmount,
      usdAmount: balanceDayResult.usdAmount,
      pesosInitialAmount: balanceDayResult.pesosInitialAmount || 0,
      usdInitialAmount: balanceDayResult.usdInitialAmount || 0,
      state: balanceDayResult.state,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function BalancePage() {
  const balance = await getData();
  const currentDate = getCurrentDate("dd-mm-yyyy");

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">{`Fecha: ${currentDate}`}</span>
        <span className="text-lg font-bold">Monto inicial</span>
        <div className="flex gap-3">
          <p>Dolares:</p>
          <p>USD</p> <p>{balance?.usdInitialAmount || 0}</p>
        </div>
        <div className="flex gap-3">
          <p>Pesos:</p>
          <p>UYU</p> <p>{balance?.pesosInitialAmount || 0}</p>
        </div>
        <span className="text-lg font-bold">Monto actual</span>
        <div className="flex gap-3">
          <p>Dolares:</p>
          <p>USD</p> <p>{balance?.usdAmount || 0}</p>
          <BalanceForm
            operation="dollars"
            balanceOpened={!!!balance}
            balance={balance}
          />
        </div>
        <div className="flex gap-3">
          <p>Pesos:</p>
          <p>UYU</p> <p>{balance?.pesosAmount || 0}</p>
          <BalanceForm
            operation="pesos"
            balanceOpened={!!!balance}
            balance={balance}
          />
        </div>
        <BalanceForm operation="both" balanceOpened={!!balance} />
        <CloseBalance balance={balance} />
      </section>
    </div>
  );
}

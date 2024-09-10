import {
  getBalanceOpenedByDate,
  getBalancePendingClose,
} from "@/server/balance";
import BalanceForm from "@/components/BalanceForm";
import CloseBalance from "@/components/CloseBalance";
import { getCurrentDate } from "@/utils/dates";
import { Balance } from "@/interfaces/balance";
import Alert from "@/components/Alert";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

interface BalancePageProps {
  balance: Balance | null;
  balancePendingClose: boolean;
}

async function getData(): Promise<BalancePageProps> {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  try {
    const currentDate = getCurrentDate("yyyy-mm-dd");
    const balancePendingClose = await getBalancePendingClose(currentDate);
    const balanceDayResult = await getBalanceOpenedByDate(currentDate);

    if (balancePendingClose) {
      return {
        balance: balancePendingClose,
        balancePendingClose: true,
      };
    }

    if (!balanceDayResult) {
      return {
        balance: null,
        balancePendingClose: false,
      };
    }
    return {
      balance: balanceDayResult,
      balancePendingClose: false,
    };
  } catch (error) {
    console.error(error);
    return {
      balance: null,
      balancePendingClose: false,
    };
  }
}

export default async function BalancePage() {
  const { balance, balancePendingClose } = await getData();
  const currentDate = getCurrentDate("dd-mm-yyyy");

  return (
    <div className="">
      {balancePendingClose && (
        <Alert
          message={`La caja del dia ${balance?.createdAt} esta pendiente de cierre.`}
          messageSecondLine="Por favor cierre la caja antes de abrir una nueva."
          severity="error"
        />
      )}
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
            balanceOpened={!!!balance || balancePendingClose}
            balance={balance}
          />
        </div>
        <div className="flex gap-3">
          <p>Pesos:</p>
          <p>UYU</p> <p>{balance?.pesosAmount || 0}</p>
          <BalanceForm
            operation="pesos"
            balanceOpened={!!!balance || balancePendingClose}
            balance={balance}
          />
        </div>
        <BalanceForm
          operation="both"
          balanceOpened={!!balance || balancePendingClose}
        />
        <CloseBalance balance={balance} />
      </section>
    </div>
  );
}

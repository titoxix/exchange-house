import {
  getBalanceOpenedByDateByUser,
  getBalancePendingCloseByUser,
} from "@/server/balance";
import BalanceForm from "@/components/BalanceForm";
import CloseBalance from "@/components/CloseBalance";
import { getCurrentDate } from "@/utils/dates";
import { Balance } from "@/interfaces/balance";
import Alert from "@/components/Alert";
import { formatCurrency } from "@/utils/currency";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

interface BalancePageProps {
  balance: Balance | null;
  balancePendingClose: boolean;
}

async function getData(): Promise<BalancePageProps> {
  const session = await auth();

  if (!session?.user) redirect("/login");

  try {
    const currentDate = getCurrentDate("yyyy-mm-dd");
    const balancePendingClose = await getBalancePendingCloseByUser(
      session.user.id,
      currentDate
    );
    const balanceDayResult = await getBalanceOpenedByDateByUser(
      session.user.id,
      currentDate
    );

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
          {formatCurrency(balance?.usdInitialAmount || 0, "es-UY", "USD")}
        </div>
        <div className="flex gap-3">
          <p>Pesos:</p>
          {formatCurrency(balance?.pesosInitialAmount || 0, "es-UY", "UYU")}
        </div>
        <span className="text-lg font-bold">Monto actual</span>
        <div className="flex gap-3">
          <p>Dolares:</p>
          {formatCurrency(balance?.usdAmount || 0, "es-UY", "USD")}
          <BalanceForm
            operation="dollars"
            balanceOpened={!!!balance || balancePendingClose}
            balance={balance}
          />
        </div>
        <div className="flex gap-3">
          <p>Pesos:</p>
          {formatCurrency(balance?.pesosAmount || 0, "es-UY", "UYU")}
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

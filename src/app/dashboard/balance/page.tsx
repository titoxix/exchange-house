import {
  getBalanceOpenedByDateByUser,
  getBalancePendingCloseByUser,
} from "@/server/balance";
import BalanceForm from "@/components/BalanceForm";
import CloseBalance from "@/components/CloseBalance";
import { getCurrentDateMontName, getCurrentDate } from "@/utils/dates";
import { Balance } from "@/interfaces/balance";
import Alert from "@/components/Alert";
import { formatCurrency } from "@/utils/currency";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Chip } from "@nextui-org/react";
import BalanceCard from "@/components/BalanceCard";

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
  const currentDate = getCurrentDateMontName();
  const balanceisOpened = !!balance || balancePendingClose;
  const chipColor = balanceisOpened ? "success" : "danger";

  return (
    <div className="flex flex-col gap-6">
      {balancePendingClose && (
        <Alert
          message={`La caja del dia ${balance?.createdAt} esta pendiente de cierre.`}
          messageSecondLine="Por favor cierre la caja antes de abrir una nueva."
          severity="error"
        />
      )}
      <section className="flex">
        <div className="flex gap-4 items-center">
          <div>
            <span className="text-lg font-bold">{`Caja del día ${currentDate}`}</span>
          </div>
          <Chip color={chipColor}>
            {balanceisOpened ? "Abierta" : "Cerrada"}
          </Chip>
        </div>
      </section>
      <section className="mt-5">
        <div className="flex flex-row gap-5">
          <BalanceForm
            operation="both"
            balanceOpened={!!balance || balancePendingClose}
          />
          <CloseBalance balance={balance} />
        </div>
      </section>
      <section className="flex">
        <div className="flex gap-10">
          <BalanceCard
            title="Dólares"
            imagePath="/flags/united-states.png"
            body={[
              {
                title: "Monto Inicial",
                value: formatCurrency(
                  balance?.usdInitialAmount || 0,
                  "es-UY",
                  "USD"
                ),
              },
              {
                title: "Dinero en caja",
                value: formatCurrency(balance?.usdAmount || 0, "es-UY", "USD"),
              },
            ]}
          >
            <BalanceForm
              operation="dollars"
              balanceOpened={!!!balance || balancePendingClose}
              balance={balance}
            />
          </BalanceCard>
          <BalanceCard
            title="Pesos Uruguayos"
            imagePath="/flags/uruguay.png"
            body={[
              {
                title: "Monto Inicial",
                value: formatCurrency(
                  balance?.pesosInitialAmount || 0,
                  "es-UY",
                  "UYU"
                ),
              },
              {
                title: "Dinero en caja",
                value: formatCurrency(
                  balance?.pesosAmount || 0,
                  "es-UY",
                  "UYU"
                ),
              },
            ]}
          >
            <BalanceForm
              operation="pesos"
              balanceOpened={!!!balance || balancePendingClose}
              balance={balance}
            />
          </BalanceCard>
        </div>
      </section>
    </div>
  );
}

import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import AccountTypesForm from "@/components/accounts/accounts-types/AccountTypesForm";
import AccountTypesTable from "@/components/accounts/accounts-types/AccountTypesTable";
import { getAccountTypes } from "@/server/account";
import { AccountType } from "@/interfaces/account";

async function getData(): Promise<{
  accountTypes: AccountType[];
}> {
  const session = await auth();

  if (!session?.user) redirect("/signin");

  try {
    const result = await getAccountTypes(session?.user.companyId);
    const adaptedResult: AccountType[] = result.map((accountType) => {
      return {
        id: accountType.id,
        name: accountType.name,
        createdAt: accountType.createdAt,
        updatedAt: accountType.updatedAt,
        accountsQuantity: accountType.accounts || [],
      };
    });
    return {
      accountTypes: adaptedResult,
    };
  } catch (error) {
    return {
      accountTypes: [],
    };
  }
}

export default async function AccountsTypes() {
  const { accountTypes } = await getData();

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Gestion tipos de cuentas</span>
        <div className="flex gap-3">
          <AccountTypesForm />
        </div>
        <AccountTypesTable accounts={accountTypes} />
      </section>
    </div>
  );
}

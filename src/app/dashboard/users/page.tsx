import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import UserForm from "@/components/UserForm";
import UsersTable from "@/components/UsersTable";
import { getUsers } from "@/server/users";
import { User } from "@/interfaces/user";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

interface Props {
  users: User[];
  isAuth: boolean;
}
async function getData(): Promise<Props> {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const showPage =
    session?.user?.role === "ADMIN" || session?.user?.role === "SUBSCRIBER";

  if (!showPage) {
    return { users: [], isAuth: false };
  }
  const { status, data: users } = await getUsers(session.user.companyId);

  if (status !== 200) return { users: [], isAuth: true };

  // If the only user is the current user, return an empty array
  const removeCurrentUser = users.filter(
    (users) => users.loginName !== session.user.loginName
  );

  if (users) return { users: removeCurrentUser, isAuth: true };

  return { users: [], isAuth: true };
}

export default async function Users() {
  const { users, isAuth } = await getData();

  if (!isAuth) {
    redirect("/dashboard");
  }

  return (
    <div className="">
      <section className="flex flex-col gap-4">
        <span className="text-lg font-bold">Usuarios del sistema</span>
        <div className="flex gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            //value={filterValue}
            //onClear={() => onClear()}
            //onValueChange={onSearchChange}
          />
          <UserForm />
        </div>
        <UsersTable users={users} />
      </section>
    </div>
  );
}

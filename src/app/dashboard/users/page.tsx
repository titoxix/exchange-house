import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import UserForm from "@/components/UserForm";
import UsersTable from "@/components/UsersTable";
import { getUsers } from "@/server/users";
import { User } from "@/interfaces/user";

async function getData(): Promise<{ users: User[] }> {
  const { status, data: users } = await getUsers();

  if (status !== 200) return { users: [] };

  if (users) return { users };

  return { users: [] };
}

export default async function Users() {
  const { users } = await getData();

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

"use client";

import { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Image,
} from "@nextui-org/react";
import SignoutButton from "./SignoutButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const menuItems = [
  { text: "Inicio", href: "/dashboard" },
  { text: "Clientes", href: "/dashboard/customers" },
  { text: "Usuarios", href: "/dashboard/users" },
  { text: "Operaciones", href: "/dashboard/orders" },
  { text: "Caja", href: "/dashboard/balance" },
  //{text: "Gestión de divisas", href: "/dashboard/currency"},
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const showAdminOptions =
    session?.user?.role === "ADMIN" || session?.user?.role === "SUBSCRIBER";

  return (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            className="hidden w-12 h-12 mr-2 lg:block"
            src="/logo.svg"
            alt="logo"
          />
          <p className="font-semibold text-white">Currency Exchange</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/dashboard"}>
          <Link
            color={pathname == "/dashboard" ? "primary" : "foreground"}
            href="/dashboard"
            aria-current="page"
          >
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/dashboard/customers"}>
          <Link
            color={
              pathname === "/dashboard/customers" ? "primary" : "foreground"
            }
            href="/dashboard/customers"
          >
            Clientes
          </Link>
        </NavbarItem>
        {showAdminOptions && (
          <NavbarItem isActive={pathname === "/dashboard/users"}>
            <Link
              color={pathname === "/dashboard/users" ? "primary" : "foreground"}
              href="/dashboard/users"
            >
              Usuarios
            </Link>
          </NavbarItem>
        )}
        <NavbarItem isActive={pathname === "/dashboard/orders"}>
          <Link
            color={pathname === "/dashboard/orders" ? "primary" : "foreground"}
            href="/dashboard/orders"
            aria-current="page"
          >
            Operaciones
          </Link>
        </NavbarItem>
        {/* <NavbarItem isActive={pathname === "/dashboard/currency"}>
          <Link
            color={
              pathname === "/dashboard/currency" ? "primary" : "foreground"
            }
            href="/dashboard/currency"
          >
            Gestión de divisas
          </Link>
        </NavbarItem> */}
        <NavbarItem isActive={pathname === "/dashboard/balance"}>
          <Link
            color={pathname === "/dashboard/balance" ? "primary" : "foreground"}
            href="/dashboard/balance"
          >
            Caja
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={session?.user?.name as string}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{session?.user?.name}</p>
              <p className="text-default-400">
                Usuario: {session?.user?.loginName}
              </p>
              <p className="text-default-400">
                Empresa: {session?.user?.companyName}
              </p>
            </DropdownItem>
            <DropdownItem className="mt-2" key="logout" color="danger">
              <SignoutButton />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}

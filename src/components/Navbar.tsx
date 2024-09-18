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
} from "@nextui-org/react";
import SignoutButton from "./SignoutButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const menuItems = ["Clientes", "Usuarios", "Operaciones", "Caja", "Salir"];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
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
        {session?.user?.role === "ADMIN" && (
          <NavbarItem isActive={pathname === "/dashboard/users"}>
            <Link
              color={pathname === "/dashboard/users" ? "primary" : "foreground"}
              href="/dashboard/users"
            >
              Usuarios
            </Link>
          </NavbarItem>
        )}
        <NavbarItem isActive={pathname === "/dashboard/transactions"}>
          <Link
            color={
              pathname === "/dashboard/transactions" ? "primary" : "foreground"
            }
            href="/dashboard/transactions"
            aria-current="page"
          >
            Operaciones
          </Link>
        </NavbarItem>
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
              <p className="text-default-400">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <SignoutButton />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
}

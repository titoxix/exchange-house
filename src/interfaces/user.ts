import { Rol } from "./profile";

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  loginName: string;
  rol: Rol;
}

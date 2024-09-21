import { Role } from "./profile";

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string | null;
  loginName: string;
  role: Role;
}

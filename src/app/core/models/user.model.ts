import { Role } from "../enums/role.enum";
import { Customer } from "./customer.modle";


export interface User {
    id: string;
    email: string;
    role: Role;
    customer?: Customer;
}

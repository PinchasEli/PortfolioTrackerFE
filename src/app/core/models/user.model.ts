import { Role } from "../enums/role.enum";
import { Customer } from "../../shared/models/customer.model";


export interface User {
    id: string;
    email: string;
    role: Role;
    customer?: Customer;
}

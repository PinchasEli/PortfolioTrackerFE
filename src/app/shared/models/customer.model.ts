import { Role } from "../../core/enums/role.enum";

export interface Customer {
    id: string;
    fullName: string;
    email: string;
    role: Role;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdAtString?: string;
    updatedAtString?: string;
}

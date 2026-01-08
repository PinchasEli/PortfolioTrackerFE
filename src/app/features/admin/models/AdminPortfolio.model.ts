import { Portfolio } from "../../portfolio/models/portfolio.model";

export interface AdminPortfolio  extends Portfolio {
    customerId: string;
    customerName: string;
}
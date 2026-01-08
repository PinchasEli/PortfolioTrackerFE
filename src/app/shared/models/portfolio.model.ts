import { Exchange } from "../enums/exchange.enum";
import { Currency } from "../enums/currency.enum";

export interface Portfolio {
    id: string;
    name: string;
    Exchange: Exchange;
    BaseCurrency: Currency;
    Active: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
}

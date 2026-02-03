import { Exchange } from "../enums/exchange.enum";
import { Currency } from "../enums/currency.enum";

export interface Portfolio {
    id: string;
    name: string;
    exchange: Exchange;
    baseCurrency: Currency;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

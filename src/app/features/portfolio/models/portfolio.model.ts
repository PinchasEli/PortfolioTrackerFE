import { Currency } from "../../../shared/enums/currency.enum";
import { Exchange } from "../../../shared/enums/exchange.enum";

export interface Portfolio {
    id: string;
    name: string;
    exchange: Exchange;
    baseCurrency: Currency;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
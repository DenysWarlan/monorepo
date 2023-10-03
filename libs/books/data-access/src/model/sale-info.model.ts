import {Price} from './price.model';

export interface SaleInfo {
    readonly country: string;
    readonly isEbook: boolean;
    readonly listPrice: Price;
    readonly retailPrice: Price;
    readonly buyLink: string;

}
import {VolumeInfo} from './volume-info.model';
import {SaleInfo} from './sale-info.model';
import {AccessInfo} from './access-info.model';
import {SearchInfo} from './search-info.model';

export interface Book {
    readonly kind: string;
    readonly id: string;
    readonly etag: string;
    readonly selfLink: string;
    readonly volumeInfo: VolumeInfo;
    readonly saleInfo: SaleInfo;
    readonly accessInfo: AccessInfo;
    readonly searchInfo: SearchInfo;
}
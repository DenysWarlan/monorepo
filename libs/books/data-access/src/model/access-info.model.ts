import {AvailableType} from './available-type.model';

export interface AccessInfo {
    readonly country: string;
    readonly viewability: string;
    readonly embeddable: boolean;
    readonly publicDomain: boolean;
    readonly textToSpeechPermission: string;
    readonly epub: AvailableType;
}
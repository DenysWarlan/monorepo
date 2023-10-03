export interface AvailableType {
    readonly isAvailable: boolean;
    readonly acsTokenLink?: string;
    readonly webReaderLink?: string;
    readonly accessViewStatus?: string;
    readonly quoteSharingAllowed?: boolean;
}
export interface BookDto {
    readonly bookId: string;
    readonly title:	string;
    readonly authors: string[];
    readonly description: string;
    readonly categories: string[];
    readonly thumbnail:	string;
}
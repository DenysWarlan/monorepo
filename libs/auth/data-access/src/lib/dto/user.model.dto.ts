export interface UserDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly birthDate: Date;
    readonly links: string[];
}
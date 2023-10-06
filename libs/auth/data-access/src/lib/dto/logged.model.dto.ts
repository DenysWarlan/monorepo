export interface LoggedDto {
    readonly email?: string;
    readonly accessToken: string;
    readonly refreshToken: string;
}
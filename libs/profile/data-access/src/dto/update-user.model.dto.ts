export interface UpdateUserDto {
    readonly name?: string;
    readonly email?: string;
    readonly password?: string;
    readonly confirmPassword?: string;
    readonly birthDate?: string;
}
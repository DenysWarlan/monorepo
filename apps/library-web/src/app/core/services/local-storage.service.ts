export class LocalStorageService {

    public setAccessToken(accessToken:string): void {
        localStorage.setItem('accessToken',accessToken);
    }

    public getAccessToken(): string {
        return  JSON.parse(localStorage.getItem('accessToken'));
    }

    public setRefreshToken(refreshToken:string): void {
        localStorage.setItem('refreshToken',refreshToken);
    }

    public getRefreshToken(): string {
        return JSON.parse(localStorage.getItem('refreshToken'));
    }

    public clearStorage(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}
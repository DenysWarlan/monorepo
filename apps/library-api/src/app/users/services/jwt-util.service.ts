import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class JwtUtilService {
    public constructor(private readonly jwtService: JwtService) {}

    public decode(request: Request): { email: string, sub: {name: string} } {
        const jwt: string = this.extractTokenFromHeader(request);

        return this.jwtService.decode(jwt, { json: true }) as { email: string, sub: {name: string} };
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token]: string[] = (request.headers as Headers & { authorization: string }).authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
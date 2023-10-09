import {ApiProperty} from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  readonly message: string;
}

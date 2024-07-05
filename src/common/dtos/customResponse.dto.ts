import { ApiProperty } from '@nestjs/swagger';

export class CustomResponseBodyObjectDto<T> {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({ description: 'Response status code', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'Request path' })
  path: string;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'Response data', type: () => Object })
  data: T;
}

export class CustomResponseBodyArrayDto<T> {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({ description: 'Response status code', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'Request path' })
  path: string;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({
    description: 'Response data',
    type: () => [Object],
  })
  data: T[];
}

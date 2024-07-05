import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginatedMeta {
  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  sortBy: string[][];

  @ApiProperty()
  searchBy: string[];

  @ApiProperty()
  search: string;

  @ApiProperty()
  select: string[];

  @ApiPropertyOptional()
  filter?: {
    [column: string]: string | string[];
  };
}

export class PaginatedLinks {
  @ApiPropertyOptional()
  first?: string | undefined;

  @ApiPropertyOptional()
  previous?: string | undefined;

  @ApiProperty()
  current: string;

  @ApiPropertyOptional()
  next?: string | undefined;

  @ApiPropertyOptional()
  last?: string | undefined;
}

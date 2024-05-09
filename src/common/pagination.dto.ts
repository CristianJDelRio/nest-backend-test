import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(99)
  start: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number = 9;
}

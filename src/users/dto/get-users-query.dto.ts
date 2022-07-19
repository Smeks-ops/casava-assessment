import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class GetAllUsersByNameQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;
}

export class GetAllUsersByEmailQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => String)
  email?: string;
}

export class GetUserByIdQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => String)
  id?: string;
}

export class GetUserByEmailQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => String)
  email?: string;
}

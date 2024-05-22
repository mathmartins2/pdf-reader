import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  clientNumber: string;

  @IsString()
  referenceMonth: string;

  @IsOptional()
  @IsNumber()
  electricEnergyQuantity?: number;

  @IsOptional()
  @IsNumber()
  electricEnergyValue?: number;

  @IsOptional()
  @IsNumber()
  electricSceeQuantity?: number;

  @IsOptional()
  @IsNumber()
  electricSceeValue?: number;

  @IsOptional()
  @IsNumber()
  electricCompensadaGdQuantity?: number;

  @IsOptional()
  @IsNumber()
  electricCompensadaGdValue?: number;

  @IsOptional()
  @IsNumber()
  contribIlumPublicaMunicipal?: number;

  @IsString()
  code: string;
}

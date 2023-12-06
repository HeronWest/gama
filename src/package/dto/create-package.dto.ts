import { IsDate, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateServicePackageDto } from "../../services/dto/create-service.dto";

class ServiceDto {
    @IsNotEmpty({ message: 'O serviço não pode estar vazio.' })
    @ValidateNested()
    @Type(() => CreateServicePackageDto)
    service: CreateServicePackageDto;
}

export class CreatePackageDto {
    @IsNotEmpty({ message: 'A data de compra é obrigatória.' })
    @IsDate({ message: 'A data de compra deve ser uma data válida.' })
    buy_date: Date;

    @IsNotEmpty({ message: 'A data de expiração é obrigatória.' })
    @IsDate({ message: 'A data de expiração deve ser uma data válida.' })
    expiration_date: Date;

    @IsNotEmpty({ message: 'A lista de serviços é obrigatória.' })
    @IsArray({ message: 'A lista de serviços deve ser um array.' })
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services: ServiceDto[];
}

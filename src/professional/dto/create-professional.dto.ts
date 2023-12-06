import {IsNotEmpty, IsString, IsArray, ValidateNested, IsNumber} from 'class-validator';
import { Type } from 'class-transformer';

class ServiceDto {
    @IsNotEmpty({ message: 'O ID do serviço é obrigatório.' })
    @IsNumber({}, { message: 'O ID do serviço deve ser um número.' })
    id: number;
}

export class CreateProfessionalDto {
    @IsNotEmpty({ message: 'O nome do profissional é obrigatório.' })
    @IsString({ message: 'O nome do profissional deve ser uma string.' })
    name: string;

    @IsNotEmpty({ message: 'A lista de serviços é obrigatória.' })
    @IsArray({ message: 'A lista de serviços deve ser um array.' })
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services: ServiceDto[];
}
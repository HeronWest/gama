import {IsNotEmpty, IsString, IsNumber, Min, IsOptional} from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty({ message: 'O nome do serviço é obrigatório.' })
    @IsString({ message: 'O nome do serviço deve ser uma string.' })
    name: string;

    @IsNotEmpty({ message: 'O valor do serviço é obrigatório.' })
    @IsNumber({}, { message: 'O valor do serviço deve ser um número.' })
    @Min(0, { message: 'O valor do serviço deve ser igual ou maior que zero.' })
    value: number;

    @IsNotEmpty({ message: 'O tempo em minutos é obrigatório.' })
    @IsNumber({}, { message: 'O tempo em minutos deve ser um número.' })
    @Min(0, { message: 'O tempo em minutos deve ser igual ou maior que zero.' })
    time_minutes: number;

    @IsNotEmpty({ message: 'O intervalo em minutos é obrigatório.' })
    @IsNumber({}, { message: 'O intervalo em minutos deve ser um número.' })
    @Min(0, { message: 'O intervalo em minutos deve ser igual ou maior que zero.' })
    interval_minutes: number;
}

export class CreateServicePackageDto {
    @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
    @IsNumber({}, { message: 'A quantidade deve ser um número.' })
    @Min(1, { message: 'A quantidade deve ser igual ou maior que um.' })
    quantity: number;

    @IsOptional() // Desconto é opcional
    @IsNumber({}, { message: 'O desconto deve ser um número.' })
    @Min(0, { message: 'O desconto deve ser igual ou maior que zero.' })
    descont?: number;

    @IsNotEmpty({ message: 'O serviço é obrigatório.' })
    @IsNumber({}, { message: 'O ID do serviço deve ser um número.' })
    serviceId: number;
}

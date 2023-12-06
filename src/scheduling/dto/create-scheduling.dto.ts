import { IsDate, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSchedulingDto {
    @IsNotEmpty({ message: 'A data é obrigatória.' })
    @IsDate({ message: 'A data deve ser uma data válida.' })
    date: Date;

    @IsNotEmpty({ message: 'O ID do serviço é obrigatório.' })
    @IsNumber({}, { message: 'O ID do serviço deve ser um número.' })
    serviceId: number;

    @IsNotEmpty({ message: 'O ID do profissional é obrigatório.' })
    @IsNumber({}, { message: 'O ID do profissional deve ser um número.' })
    professionalId: number;

    @IsOptional()
    @IsString({ message: 'O comentário deve ser uma string.' })
    comment?: string;
}

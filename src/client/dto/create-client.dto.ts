import {IsDefined, IsEmail, IsNotEmpty, IsPhoneNumber} from "class-validator";

export class CreateClientDto {
    @IsDefined({ message: 'O campo "name" não pode ser nulo.' })
    @IsNotEmpty({ message: 'O campo "name" não pode ser nulo.' })
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber("BR")
    number: string;
}

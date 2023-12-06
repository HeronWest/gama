import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import postgres from "postgres";
import column = postgres.toPascal.column;

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    number: string;
}
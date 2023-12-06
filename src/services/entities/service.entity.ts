import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import postgres from "postgres";
import column = postgres.toPascal.column;

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    time_minutes: number

    @Column()
    interval_minutes: number;
}

@Entity()
export class ServicePackage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    descont: number;

    @OneToOne(() => Service)
    @JoinColumn()
    service: Service
}
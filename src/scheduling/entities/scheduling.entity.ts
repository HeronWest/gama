// professional.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Service} from "../../services/entities/service.entity";
import {Professional} from "../../professional/entities/professional.entity";

@Entity()
export class Scheduling {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(() => Service)
    @JoinColumn()
    service: Service;

    @ManyToOne(() => Professional)
    @JoinColumn()
    professional: Professional;

    @Column()
    comment: string;
}

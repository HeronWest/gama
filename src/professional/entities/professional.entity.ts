// professional.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn} from "typeorm";
import {Service, ServicePackage} from "../../services/entities/service.entity";

@Entity()
export class Professional {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Service)
    @JoinColumn()
    services: Service[];
}

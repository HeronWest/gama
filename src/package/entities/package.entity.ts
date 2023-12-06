import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ServicePackage } from "../../services/entities/service.entity";

@Entity()
export class Package {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buy_date: Date;

    @Column()
    expiration_date: Date;

    @ManyToMany(() => ServicePackage)
    @JoinTable()
    services: ServicePackage[];
}

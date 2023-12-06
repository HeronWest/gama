import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientModule} from './client/client.module';
import {ProfessionalModule} from './professional/professional.module';
import {ServicesModule} from './services/services.module';
import {PackageModule} from './package/package.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import { SchedulingModule } from './scheduling/scheduling.module';
import {Client} from "./client/entities/client.entity";
import {Scheduling} from "./scheduling/entities/scheduling.entity";
import {Package} from "./package/entities/package.entity";
import {Service, ServicePackage} from "./services/entities/service.entity";
import {Professional} from "./professional/entities/professional.entity";

@Module({
    imports: [ClientModule, ProfessionalModule, ServicesModule, PackageModule, TypeOrmModule.forRoot(
        {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'teste',
            password: '12345',
            database: 'testeDB',
            entities: [Client, Scheduling, Package, Professional, Service, ServicePackage],
            synchronize: true
        }
    ), SchedulingModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}

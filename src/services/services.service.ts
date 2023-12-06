import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
      @InjectRepository(Service)
      private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const newService = this.serviceRepository.create(createServiceDto);
      return await this.serviceRepository.save(newService);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Service[]> {
    try {
      return await this.serviceRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Service> {
    try {
      const foundService = await this.serviceRepository.findOne({ where: { id } });
      if (!foundService) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }
      return foundService;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    try {
      const serviceToUpdate = await this.findOne(id);
      // Aqui, você pode fazer qualquer lógica de atualização necessária
      // Por exemplo:
      serviceToUpdate.name = updateServiceDto.name;
      serviceToUpdate.value = updateServiceDto.value;
      serviceToUpdate.time_minutes = updateServiceDto.time_minutes;
      serviceToUpdate.interval_minutes = updateServiceDto.interval_minutes;

      return await this.serviceRepository.save(serviceToUpdate);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const foundService = await this.findOne(id);
      await this.serviceRepository.remove(foundService);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

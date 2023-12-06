import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Injectable()
export class ProfessionalService {
  constructor(
      @InjectRepository(Professional)
      private professionalRepository: Repository<Professional>,
  ) {}

  async create(createProfessionalDto: CreateProfessionalDto): Promise<Professional> {
    try {
      const newProfessional = this.professionalRepository.create(createProfessionalDto);
      return await this.professionalRepository.save(newProfessional);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Professional[]> {
    try {
      return await this.professionalRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Professional> {
    try {
      const foundProfessional = await this.professionalRepository.findOne({where: {id}});
      if (!foundProfessional) {
        throw new NotFoundException(`Professional with ID ${id} not found`);
      }
      return foundProfessional;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateProfessionalDto: UpdateProfessionalDto): Promise<Professional> {
    try {
      const professionalToUpdate = await this.findOne(id);
      // Aqui, você pode fazer qualquer lógica de atualização necessária
      // Por exemplo:
      professionalToUpdate.name = updateProfessionalDto.name;

      return await this.professionalRepository.save(professionalToUpdate);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const foundProfessional = await this.findOne(id);
      await this.professionalRepository.remove(foundProfessional);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
      @InjectRepository(Package)
      private packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const { services, ...packageData } = createPackageDto;

    // Mapear manualmente para um objeto DeepPartial<Package>
    const newPackage = this.packageRepository.create({
      ...packageData,
      services: services.map(service => service.service),
    });

    return await this.packageRepository.save(newPackage);
  }

  async findAll(): Promise<Package[]> {
    return await this.packageRepository.find();
  }

  async findOne(id: number): Promise<Package> {
    const foundPackage = await this.packageRepository.findOne({where : {id}});
    if (!foundPackage) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return foundPackage;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto): Promise<Package> {
    const packageToUpdate = await this.findOne(id);

    // Aqui, você pode fazer qualquer lógica de atualização necessária
    // Por exemplo:
    // packageToUpdate.quantity = updatePackageDto.quantity;

    // Corrigir a atualização
    Object.assign(packageToUpdate, updatePackageDto);

    return await this.packageRepository.save(packageToUpdate);
  }

  async remove(id: number): Promise<void> {
    const foundPackage = await this.findOne(id);
    await this.packageRepository.remove(foundPackage);
  }
}

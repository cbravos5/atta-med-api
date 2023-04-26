import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicDto } from '../dto/create-medic.dto';
import { SearchMedicDto } from '../dto/search-medic.dto';
import { MedicsRepository } from '../repositories/medics.repository';

@Injectable()
export class MedicsService {
  constructor(private medicRepository: MedicsRepository) {}

  async create(createMedicDto: CreateMedicDto) {
    const medicExists = await this.medicRepository.findByCrm(createMedicDto.crm);

    if (medicExists)
      throw new ConflictException('Medic already exists');

    return await this.medicRepository.create(createMedicDto);
  }

  async search(request: SearchMedicDto) {
    return await this.medicRepository.findByNameCrm(request.searchText);
  }
}

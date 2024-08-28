import { Service } from 'typedi';
import { FileDto } from '@/dto/FileDto';

@Service()
export class FilesService {
  async save(fileDto: FileDto) {
    return fileDto;
  }
}

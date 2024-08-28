import { JsonController, Post, Body, UseBefore } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { uploadMiddleware, filter } from '@/middlewares/uploadMiddleware';
import { FilesService } from '@/services/FilesService';
import { FileDto } from '@/dto/FileDto';

@Service()
@JsonController('/files')
export class FilesController {
  @Inject()
  private filesService: FilesService;

  @UseBefore(uploadMiddleware({ fileFilter: filter(['text/markdown']) }))
  @Post('/upload/md')
  async uploadMD(@Body() fileDto: FileDto) {
    return this.upload(Object.assign(fileDto, { category: 'md' }));
  }

  async upload(fileDto: FileDto) {
    const data = await this.filesService.save(fileDto);
    return { data };
  }
}

import { DogRepository } from '../../repositories/dog.repository';

export interface UploadDogsFromFileUseCase {
  execute(file: Express.Multer.File): Promise<string>;
}

export class UploadDogsFromFile implements UploadDogsFromFileUseCase {
  constructor(private readonly repository: DogRepository) {}

  public async execute(file: Express.Multer.File): Promise<string> {
    return this.repository.uploadDogsFromFile(file);
  }
}

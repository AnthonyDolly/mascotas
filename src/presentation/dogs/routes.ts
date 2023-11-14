import { Router } from 'express';
import { DogDatasourceImpl } from '../../infrastructure/datasources/dog.datasource.impl';
import { DogRepositoryImpl } from '../../infrastructure/repositories/dog.repository.impl';
import { DogController } from './controller';

export class DogRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new DogDatasourceImpl();
    const dogRepository = new DogRepositoryImpl(datasource);
    const dogController = new DogController(dogRepository);

    router.get('/', dogController.getDogs);
    router.get('/:id', dogController.getDog);
    router.get('/:id/photo', dogController.getDogImage);
    router.post('/', dogController.createDog);
    router.put('/:id', dogController.updateDog);
    router.delete('/:id', dogController.deleteDog);
    router.post('/upload-dogs-from-file', dogController.uploadDogsFromFile);

    return router;
  }
}

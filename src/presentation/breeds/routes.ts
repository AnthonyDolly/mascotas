import { Router } from 'express';
import { BreedDatasourceImpl } from '../../infrastructure/datasources/breed.datasource.impl';
import { BreedRepositoryImpl } from '../../infrastructure/repositories/breed.repository.impl';
import { BreedController } from './controller';

export class BreedRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new BreedDatasourceImpl();
    const breedRepository = new BreedRepositoryImpl(datasource);
    const breedController = new BreedController(breedRepository);

    router.get('/', breedController.getBreeds);
    router.get('/:id', breedController.getBreed);
    router.post('/', breedController.createBreed);
    router.put('/:id', breedController.updateBreed);
    router.delete('/:id', breedController.deleteBreed);

    return router;
  }
}

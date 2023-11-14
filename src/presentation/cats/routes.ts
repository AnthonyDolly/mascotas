import { Router } from 'express';
import { CatDatasourceImpl } from '../../infrastructure/datasources/cat.datasource.impl';
import { CatRepositoryImpl } from '../../infrastructure/repositories/cat.repository.impl';
import { CatController } from './controller';

export class CatRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new CatDatasourceImpl();
    const catRepository = new CatRepositoryImpl(datasource);
    const catController = new CatController(catRepository);

    router.get('/', catController.getCats);
    router.get('/:id', catController.getCat);
    router.post('/', catController.createCat);
    router.put('/:id', catController.updateCat);
    router.delete('/:id', catController.deleteCat);

    return router;
  }
}

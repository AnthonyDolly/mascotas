import { Router } from 'express';
import { SizeDatasourceImpl } from '../../infrastructure/datasources/size.datasource.impl';
import { SizeRepositoryImpl } from '../../infrastructure/repositories/size.repository.impl';
import { SizeController } from './controller';

export class SizeRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new SizeDatasourceImpl();
    const sizeRepository = new SizeRepositoryImpl(datasource);
    const sizeController = new SizeController(sizeRepository);

    router.get('/', sizeController.getSizes);
    router.get('/:id', sizeController.getSize);
    router.post('/', sizeController.createSize);
    router.put('/:id', sizeController.updateSize);
    router.delete('/:id', sizeController.deleteSize);

    return router;
  }
}

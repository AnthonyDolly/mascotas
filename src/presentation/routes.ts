import { Router } from 'express';
import { BreedRoutes } from './breeds/routes';
import { SizeRoutes } from './sizes/routes';
import { DogRoutes } from './dogs/routes';
import { CatRoutes } from './cats/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/breeds', BreedRoutes.routes);
    router.use('/api/sizes', SizeRoutes.routes);
    router.use('/api/dogs', DogRoutes.routes);
    router.use('/api/cats', CatRoutes.routes);

    return router;
  }
}

import { Request, Response } from 'express';
import {
  BreedRepository,
  CreateBreed,
  CreateBreedDto,
  DeleteBreed,
  GetBreed,
  GetBreeds,
  UpdateBreed,
  UpdateBreedDto,
} from '../../domain';

export class BreedController {
  constructor(private readonly breedRepository: BreedRepository) {}

  public getBreeds = (req: Request, res: Response) => {
    new GetBreeds(this.breedRepository)
      .execute()
      .then((breeds) => res.json(breeds))
      .catch((error) => res.status(400).json({ error }));
  };

  public getBreed = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'id must be a number' });
      return;
    }

    new GetBreed(this.breedRepository)
      .execute(id)
      .then((breed) => res.json(breed))
      .catch((error) => res.status(400).json({ error }));
  };

  public createBreed = (req: Request, res: Response) => {
    const [error, createBreedDto] = CreateBreedDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateBreed(this.breedRepository)
      .execute(createBreedDto!)
      .then((breed) => res.json(breed))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateBreed = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const [error, updateBreedDto] = UpdateBreedDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    new UpdateBreed(this.breedRepository)
      .execute(id, updateBreedDto!)
      .then((breed) => res.json(breed))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteBreed = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    new DeleteBreed(this.breedRepository)
      .execute(id)
      .then((breed) => res.json(breed))
      .catch((error) => res.status(400).json({ error }));
  };
}

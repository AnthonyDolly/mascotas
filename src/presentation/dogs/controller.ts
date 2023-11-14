import { Request, Response } from 'express';
import {
  DogRepository,
  CreateDog,
  CreateDogDto,
  DeleteDog,
  GetDog,
  GetDogs,
  UpdateDog,
  UpdateDogDto,
  UploadDogsFromFile,
  GetDogImage,
} from '../../domain';

export class DogController {
  constructor(private readonly dogRepository: DogRepository) {}

  public getDogs = (req: Request, res: Response) => {
    new GetDogs(this.dogRepository)
      .execute()
      .then((dogs) => res.json(dogs))
      .catch((error) => res.status(400).json({ error }));
  };

  public getDog = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'id must be a number' });
      return;
    }

    new GetDog(this.dogRepository)
      .execute(id)
      .then((dog) => res.json(dog))
      .catch((error) => res.status(400).json({ error }));
  };

  public createDog = (req: Request, res: Response) => {
    req.body.file = req.file?.filename;

    const [error, createDogDto] = CreateDogDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateDog(this.dogRepository)
      .execute(createDogDto!)
      .then((dog) => res.json(dog))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateDog = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    req.body.file = req.file?.filename;

    const [error, updateDogDto] = UpdateDogDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    new UpdateDog(this.dogRepository)
      .execute(id, updateDogDto!)
      .then((dog) => res.json(dog))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteDog = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'id must be a number' });
      return;
    }

    new DeleteDog(this.dogRepository)
      .execute(id)
      .then((dog) => res.json(dog))
      .catch((error) => res.status(400).json({ error }));
  };

  public uploadDogsFromFile = (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'file not found' });
      return;
    }

    new UploadDogsFromFile(this.dogRepository)
      .execute(req.file)
      .then((message) => res.json({ message }))
      .catch((error) => res.status(400).json({ error }));
  };

  public getDogImage = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'id must be a number' });
      return;
    }

    new GetDogImage(this.dogRepository)
      .execute(id)
      .then((dog) => res.sendFile(dog))
      .catch((error) => res.status(400).json({ error }));
  };
}

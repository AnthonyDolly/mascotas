import express, { Router } from 'express';
import multer from 'multer';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly upload = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').pop();
      const filename = `${Date.now()}.${extension}`;
      cb(null, filename);
    },
  });

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(multer({ storage: this.upload }).single('file'));

    //* Public Folders

    //* Routes
    this.app.use(this.routes);

    //* SPA

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}


import express, { Application as ExApplication, Handler } from 'express';
import cors from 'cors';
import { controllers } from './controller';
import { MetadataKeys } from './util/decorator/metadata.keys';
import { IRouter } from './util/decorator/handlers.decorator';
import { container } from 'tsyringe';
import multer from 'multer';
import bodyParser from 'body-parser';
import RoutesInfo  from './constants/routesInfo.type';
const storage = multer.memoryStorage();
const upload = multer({ storage });
export default class Server {
    private app: ExApplication;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.middlewares();
        this.registerRouters();
        
    }

    private middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(upload.single('file'));
        this.app.use(cors());
    }

    private registerRouters() {
        const info: RoutesInfo[] = [];
        controllers.forEach((controllerClass) => {
            const controllerInstance: { [handleName: string]: Handler } = container.resolve(controllerClass as any);
            const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
            const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);
            const exRouter = express.Router();
            routers.forEach(({ method, path, handlerName }) => {
                exRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));
                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controllerClass.name}.${String(handlerName)}`,
                });
            });
            this.app.use(basePath, exRouter);
        });
        console.table(info);
    }

    listen() {
        this.app.listen(3000, () => {
            console.log('App listening on port 3000');
        })
    }
}
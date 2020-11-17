import "reflect-metadata";
import bodyParser from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
// Controllers (route handlers)
import { createConnection } from "typeorm";
import "./controllers/auth.controller";
import "./controllers/user.controller";
import container from "./ioc-config/config";
import bindMiddlewares from "./ioc-config/middleware.bind";
import bindRepositories from "./ioc-config/repositories.bind";
import { corsMiddleware } from "./middlewares/cors";
import logger from "./utils/logger";
async function createApp() {    
    await createConnection();
    await bindRepositories(container);
    await bindMiddlewares(container);
    
    const baseApi = process.env.BASE_API;
    const server = new InversifyExpressServer(
        container, null, {rootPath: `${baseApi}`}
    );
    
    server.setConfig((app) => {
        logger.info("database connection created");
        // Express configuration
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(corsMiddleware);
    });
    const app = server.build();
    
    // create server
    app.listen(process.env.PORT, () => {
        logger.info(`Server running at http://localhost:${process.env.PORT}`);
    });
    // await bindControllers();
}

(async () => {
    try {
        await createApp();

    } catch (e) {
        console.log(e.message);
    }
})();
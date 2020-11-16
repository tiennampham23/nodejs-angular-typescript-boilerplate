import { interfaces } from "inversify";
import { AuthenticateMiddleware } from "../middlewares/authenticate.middleware";
import { RequiredLoginMiddleware } from "../middlewares/requriedLogin.middleware";
import { REPOSITORY_TYPES } from "./types";

export default async function bindMiddlewares(
    container: interfaces.Container
) {
   const middlewares = [
        {
            type: REPOSITORY_TYPES.AuthenticatedMiddleware,
            entity: AuthenticateMiddleware
        },
        {
            type: REPOSITORY_TYPES.RequiredMiddleware,
            entity: RequiredLoginMiddleware 
        }
   ];
   middlewares.forEach(middleware => {
        container.bind(middleware.type).to(middleware.entity);
   });
}
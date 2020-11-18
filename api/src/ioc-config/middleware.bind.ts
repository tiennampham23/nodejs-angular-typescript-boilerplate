import { interfaces } from "inversify";
import { AuthenticateMiddleware } from "../middlewares/authenticate.middleware";
import { RequiredLoginMiddleware } from "../middlewares/requriedLogin.middleware";
import { MIDDLEWARE_TYPES } from "./types";

export default async function bindMiddlewares(
    container: interfaces.Container
) {
   const middlewares = [
        {
            type: MIDDLEWARE_TYPES.AuthenticatedMiddleware,
            entity: AuthenticateMiddleware
        },
        {
            type: MIDDLEWARE_TYPES.RequiredMiddleware,
            entity: RequiredLoginMiddleware 
        }
   ];
   middlewares.forEach(middleware => {
        container.bind(middleware.type).to(middleware.entity);
   });
}
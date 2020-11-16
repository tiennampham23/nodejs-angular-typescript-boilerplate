import * as express from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import ApiResponse from "../utils/apiResponse";
@injectable()
export class RequiredLoginMiddleware extends BaseMiddleware {
    public async handler(
        req: RequestCustom,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.isLogged) {
            next();
        } else {
            next(ApiResponse.error(res, null, HTTP_CODE.NOT_AUTHORIZATION, MESSAGE.AUTH.NOT_AUTHORIZATION));
        }
    }
}
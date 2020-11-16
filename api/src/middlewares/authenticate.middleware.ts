import * as express from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE, TokenDecoded } from "../constants";
import ignorePath from "../constants/ignorePath";
import { REPOSITORY_TYPES } from "../ioc-config/types";
import { IUserRepository } from "../repositories";
import { verifyToken } from "../utils";
import ApiResponse from "../utils/apiResponse";
@injectable()
export class AuthenticateMiddleware extends BaseMiddleware {
    @inject(REPOSITORY_TYPES.IUserRepository) private readonly userRepository: IUserRepository;
    public async handler(
        req: RequestCustom,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (ignorePath.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
            req.isLogged = false;
            const {authorization} = req.headers;
            if (authorization && authorization.match(/^Bearer /g)) {
                const token = authorization.split(" ")[1];
                if (token) {
                    try {
                        const tokenDecoded: TokenDecoded = <TokenDecoded> await verifyToken(token);
                        const userId = tokenDecoded.id;
                        const user = await this.userRepository.getById(userId);
                        if (user) {
                            req.isLogged = true;
                            req.userId = user.id;
                            next();
                        }
                    } catch (e) {
                        return ApiResponse.error(res, null, HTTP_CODE.NOT_AUTHENTICATION, MESSAGE.AUTH.INVALID_TOKEN);
                    }
                }
            }
        }
    }
}
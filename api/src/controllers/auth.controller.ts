import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import { REPOSITORY_TYPES } from "../ioc-config/types";
import { IUserRepository } from "../repositories";
import { generateHash, generateToken, verifyHash } from "../utils";
import ApiResponse from "../utils/apiResponse";


@controller("/auth")
export class AuthController implements interfaces.Controller  {
    @inject(REPOSITORY_TYPES.IUserRepository) private readonly userRepository: IUserRepository;

    @httpPost("/login")
    private async login(@request() req: RequestCustom, @response() res: Response) {
        let user = null;
        try {
            console.log(req.body);
            
            const {email, password} = req.body;
            user = await this.userRepository.getByEmail(email);
            if (user) {
                const isCorrectPassword = await verifyHash(password, user.password);
                if (isCorrectPassword) {
                    const token = await generateToken({id: user.id}, {expiresIn: process.env.EXPIRE_DATE_TOKEN});
                    return ApiResponse.success(res, token, HTTP_CODE.SUCCESS, MESSAGE.AUTH.LOGIN_SUCCESS);
                }
                return ApiResponse.error(res, null, HTTP_CODE.NOT_AUTHENTICATION,MESSAGE.AUTH.PASSWORD_NOT_CORRECT);
            }
            return ApiResponse.error(res, null, HTTP_CODE.NOT_AUTHENTICATION, MESSAGE.AUTH.EMAIL_NOT_CORRECT);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }
    @httpPost("/register")
    private async register(@request() req: Request, @response() res: Response) {
        try {
            const {email, password, name} = req.body;
            const passwordHash = await generateHash(password, 10);
            await this.userRepository.create({
                email, 
                password: passwordHash, 
                name, 
                isActive: true
            });
            return ApiResponse.success(res, true, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            return ApiResponse.error(res, null,  HTTP_CODE.ERROR, ex.toString());
        }
    }
}
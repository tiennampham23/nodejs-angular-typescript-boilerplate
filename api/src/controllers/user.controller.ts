import { Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import { MIDDLEWARE_TYPES, REPOSITORY_TYPES } from "../ioc-config/types";
import { IUserRepository } from "../repositories";
import { generateHash } from "../utils";
import ApiResponse from "../utils/apiResponse";


@controller("/user")
export class UserController {
    @inject(REPOSITORY_TYPES.IUserRepository) private readonly userRepository: IUserRepository;

    @httpGet("/getAll")
    private async getAll(@request() req: RequestCustom, @response() res: Response) {
        try {
            const users = await this.userRepository.getAll({});
            return ApiResponse.success(res, users, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }


    @httpGet("/getOne/:id", MIDDLEWARE_TYPES.AuthenticatedMiddleware, MIDDLEWARE_TYPES.RequiredMiddleware)
    private async getOne(@request() req: RequestCustom, @response() res: Response) {
        try {
            const {params} = req;
            const {id} = params;
            const user = await this.userRepository.getById(Number(id));
            if (!user) {
                return ApiResponse.error(res, null, HTTP_CODE.NOT_FOUND, MESSAGE.USER.NOT_FOUND); 
            }
            return ApiResponse.success(res, user, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    @httpPost("/create")
    private async createUser(@request() request: RequestCustom, @response() response: Response) {
        try {
            const user = request.body;
            const {email, name, password} = user;
            const passwordHash = await generateHash(password, 10);
            await this.userRepository.create({
                email, 
                password: passwordHash, 
                name, 
                isActive: true
            });
            return ApiResponse.success(response, true, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (e) {
            return ApiResponse.error(response, null, HTTP_CODE.ERROR, MESSAGE.USER.CANNOT_CREATE_USER);
        }
    }
    @httpPut("/update/:id")
    async updateUser(@request() request: RequestCustom, @response() response: Response) {
        try {
            const user = request.body;
            const {id} = request.params;
            const {email, name} = user;
            await this.userRepository.update(Number(id), {name, email});
            return ApiResponse.success(response, true, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (e) {
            return ApiResponse.error(response, null, HTTP_CODE.ERROR, MESSAGE.USER.CANNOT_CREATE_USER);
        }
    }
    @httpDelete("/delete/:id")
    async deleteUser(@request() request: RequestCustom, @response() response: Response) {
        try {
            const {id} = request.params;
            await this.userRepository.delete(Number(id));
            return ApiResponse.success(response, {}, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (e) {
            return ApiResponse.error(response, null, HTTP_CODE.ERROR, MESSAGE.USER.CANNOT_CREATE_USER);
        }
    }
}

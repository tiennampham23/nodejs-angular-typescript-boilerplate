import { UserEntity } from "../entities/user.entity";
import { IBaseRepository } from "./base/i.base.repository";

export interface IUserRepository extends IBaseRepository<UserEntity> {
    getByEmail(email: string): Promise<UserEntity>;
}
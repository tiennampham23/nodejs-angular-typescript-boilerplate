import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { REPOSITORY_TYPES } from "../ioc-config/types";
import { BaseRepository } from "./base/base.repository";
import { IUserRepository } from "./i.user.repository";

@injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository{
    private userRepository: Repository<UserEntity>;
    constructor(
       @inject(REPOSITORY_TYPES.UserEntity) repository: Repository<UserEntity>
    ) {
       super(repository);
       this.userRepository = repository;
    }
    getByEmail(email: string): Promise<UserEntity> {
       return this.userRepository.findOne({
           email
       });
    }

}
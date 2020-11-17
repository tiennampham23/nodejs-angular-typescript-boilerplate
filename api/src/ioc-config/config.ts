import { Container } from "inversify";
import { Repository } from "typeorm";
import { IUserRepository, UserRepository } from "../repositories";
import bindRepositories from "./repositories.bind";
// import { CustomRepository } from './base/typeorm';
import { REPOSITORY_TYPES } from "./types";

// init container
const container = new Container();

// register repositories
container.bind<IUserRepository>(REPOSITORY_TYPES.IUserRepository).to(UserRepository).inSingletonScope();


export default container;
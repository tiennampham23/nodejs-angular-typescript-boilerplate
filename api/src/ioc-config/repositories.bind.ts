import { interfaces } from "inversify";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { getRepositories } from "./db/repository.factory";

export default async function bindRepositories(
    container: interfaces.Container
) {
   const entityTypes = [
        "Repository<UserEntity>"
   ];
   const repositories = await getRepositories<any>([UserEntity]);
   repositories.forEach((repository, i) => {
    const repositoryType = entityTypes[i];
    container.bind<Repository<any>>(repositoryType).toConstantValue(repository); 
   });
   return repositories;
}
import { getConnection } from "typeorm";

export async function getRepositories<T>(
    entities: Array<any>
) {
    const connection = getConnection();
    return entities.map(entity => {
        return connection.getRepository<T>(entity);
    });
}
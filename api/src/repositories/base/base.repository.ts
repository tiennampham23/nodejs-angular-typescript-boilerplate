import { injectable, unmanaged } from "inversify";
import { BaseEntity, EntityTarget, getConnection, getRepository, Repository } from "typeorm";
import { IBaseRepository } from "./i.base.repository";

@injectable()
export class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
    protected baseRepository: Repository<T>
    constructor(
        @unmanaged() repository: Repository<T>
    ) {
      this.baseRepository = repository;
    }

    async create(data: any): Promise<void> {
        await this.baseRepository.save(data);
    }

    async update(id: number, data: any): Promise<void> {
        const existEntity = await this.getById(id);
        if (!existEntity) {
            throw new Error("Cannot find entity");
        }
        this.baseRepository.update(id, data);
    }

    async getAll(filter: any): Promise<T[]> {
        return this.baseRepository.find({
            ...filter
        });
    }

    async getById(id: number): Promise<T> {
        return this.baseRepository.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const existEntity = await this.getById(id);
        if (!existEntity) {
            throw new Error("Cannot find entity");
        }
        this.baseRepository.delete(id);
    }
}
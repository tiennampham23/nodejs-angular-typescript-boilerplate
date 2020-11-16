export interface IBaseRepository<T> {
    create(data: any): Promise<void>;
    update(id: number, data: any): Promise<void>;
    getAll(filter: any): Promise<T[]>;
    getById(id: number): Promise<T>;
    delete(data: number): Promise<void>;
}
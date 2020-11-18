
export const REPOSITORY_TYPES = {
    IUserRepository: Symbol.for("IUserRepository"),
    UserEntity: Symbol.for("Repository<UserEntity>")
};

export const MIDDLEWARE_TYPES = {
    AuthenticatedMiddleware: Symbol.for("AuthenticatedMiddleware"),
    RequiredMiddleware: Symbol.for("RequiredMiddleware")
}

export const REPOSITORY_TYPES = {
    IUserRepository: Symbol("IUserRepository"),
    AuthenticatedMiddleware: Symbol.for("AuthenticatedMiddleware"),
    RequiredMiddleware: Symbol.for("RequiredMiddleware"),
};
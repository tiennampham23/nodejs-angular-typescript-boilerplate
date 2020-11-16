import {UserEntity} from "../entities/user.entity";

const sanitizeUser = (user: UserEntity) => {
    const { password, ...userWithOutPassword } = user;
    return userWithOutPassword;
};

export {
    sanitizeUser
};

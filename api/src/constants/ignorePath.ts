const base = process.env.BASE_API;
export default {
    authorizationIgnorePath: [
        `${base}/user/auth/login`,
        `${base}/user/auth/register`,
    ],
};

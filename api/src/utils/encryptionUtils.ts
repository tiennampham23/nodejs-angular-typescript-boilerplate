import * as bcrypt from "bcrypt";
import logger from "./logger";

const generateHash = async (
    password: string,
    saltRounds: number,
): Promise<string> =>
    new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
            if (!err) {
                resolve(hash);
            }
            reject(err);
        });
    });

const verifyHash = async (
    password: string,
    hash: string,
): Promise<boolean> =>
    new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err: Error, result: boolean) => {
            logger.debug(err);
            logger.debug(result);
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

export {
    generateHash,
    verifyHash
};

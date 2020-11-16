import {CoreEntity} from "./core.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity("user", {orderBy: {id: "ASC"}})
export class UserEntity extends CoreEntity {
    @Column()
    @Unique(["email"])
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    lastLogin: string;
}

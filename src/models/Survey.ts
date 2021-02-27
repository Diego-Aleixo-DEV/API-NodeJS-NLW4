import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as generator } from "uuid";

@Entity("surveys")
class Survey {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = generator();
        }
    }
}

export { Survey };
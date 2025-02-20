import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum RecourseStatus {
    NEW = "NEW",
    IN_WORK = "IN_WORK",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}


@Entity()
export class Recourse {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 255})
    theme: string

    @Column("text")
    description: string

    @Column({
        type: 'simple-enum',
        enum: RecourseStatus,
        default: RecourseStatus.NEW
    })
    status: RecourseStatus;
}
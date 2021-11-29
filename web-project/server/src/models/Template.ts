import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

@Entity('template')
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, {nullable: false})
    @JoinColumn({name: 'project_id'})
    project: Project;

    @Column({type: 'text', nullable: true})
    amountUse: number;    

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { nullable: false, unique: true })
  name!: string;
}

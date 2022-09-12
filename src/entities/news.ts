import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Category from "./category";
import User from "./user";

@Entity("news")
export default class News {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { nullable: false })
  name!: string;

  @Column("text", { nullable: false })
  text!: string;

  @CreateDateColumn({
    default: new Date(),
  })
  publication_date!: Date;

  @ManyToOne(() => Category)
  @JoinColumn()
  category!: Category;

  @ManyToOne(() => User)
  @JoinColumn()
  writer!: User;
}

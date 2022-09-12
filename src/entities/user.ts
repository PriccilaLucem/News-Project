import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { length: 20, nullable: false })
  name!: string;

  @Column("varchar", { length: 100, nullable: false, select: false })
  password!: string;

  @Column("varchar", { length: 50, nullable: false, unique: true })
  email!: string;

  @Column("bool", { default: false, nullable: true })
  is_adm!: boolean;

  @CreateDateColumn({ default: new Date() })
  created_at!: Date;

  @CreateDateColumn({ default: new Date() })
  updated_at!: Date;
}

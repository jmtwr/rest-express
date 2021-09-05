import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity("user")
export class UserEnt {

  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column()
  password!: string;
}
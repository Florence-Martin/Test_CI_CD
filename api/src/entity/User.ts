import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "firstname" })
  firstname!: string;

  @Column({ name: "lastname" })
  lastname!: string;

  @Column()
  age!: number;
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class User1630850271595 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public."User" (
        user_id serial NOT NULL,
        email varchar NOT NULL,
        password varchar NOT NULL,
        firstName varchar NOT NULL,
        lastName varchar NOT NULL,
        CONSTRAINT "pk_user_id" PRIMARY KEY (user_id),
        CONSTRAINT "uq_email" UNIQUE (email)
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLSE IF EXISTS user;`);
  }
}
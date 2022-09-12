import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1662054173997 implements MigrationInterface {
  name = "initial1662054173997";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "is_adm" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-09-01T17:42:55.777Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-09-01T17:42:55.777Z"', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "news" ADD "categoryId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "UQ_12a76d9b0f635084194b2c6aa01" UNIQUE ("categoryId")`
    );
    await queryRunner.query(`ALTER TABLE "news" ADD "writerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "UQ_1dc5653cff6bd54aefe98f2e2cb" UNIQUE ("writerId")`
    );
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "publication_date" SET DEFAULT '"2022-09-01T17:42:55.838Z"'`
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_1dc5653cff6bd54aefe98f2e2cb" FOREIGN KEY ("writerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_1dc5653cff6bd54aefe98f2e2cb"`
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`
    );
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "publication_date" SET DEFAULT '2022-08-31 16:44:44.887'`
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "UQ_1dc5653cff6bd54aefe98f2e2cb"`
    );
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "writerId"`);
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "UQ_12a76d9b0f635084194b2c6aa01"`
    );
    await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "categoryId"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

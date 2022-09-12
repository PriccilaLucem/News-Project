import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1662658025306 implements MigrationInterface {
    name = 'migrations1662658025306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '"2022-09-08T17:27:06.694Z"'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '"2022-09-08T17:27:06.694Z"'`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "publication_date" SET DEFAULT '"2022-09-08T17:27:06.695Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "publication_date" SET DEFAULT '2022-09-08 17:26:47.622'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2022-09-08 17:26:47.483'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2022-09-08 17:26:47.483'`);
    }

}

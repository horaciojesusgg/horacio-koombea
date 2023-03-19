import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1679197888611 implements MigrationInterface {
    name = 'FirstMigration1679197888611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD "creditCardLastFour" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_file" ADD "errors" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_file" DROP COLUMN "errors"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "creditCardLastFour"`);
    }

}

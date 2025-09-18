import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1758195070979 implements MigrationInterface {
    name = 'InitSchema1758195070979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "dueDate" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "due_date" ("id" SERIAL NOT NULL, "dueDates" character varying NOT NULL, CONSTRAINT "PK_b95d254d16761d53e9d55f818ef" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "due_date"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}

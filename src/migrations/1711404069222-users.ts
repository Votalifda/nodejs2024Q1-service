import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1711404069222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'login',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'version',
                        type: 'bigint',
                    },
                    {
                        name: 'createdAt',
                        type: 'bigint',
                    },
                    {
                        name: 'updatedAt',
                        type: 'bigint',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

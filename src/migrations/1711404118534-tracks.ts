import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Tracks1711404118534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tracks',
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
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'duration',
                        type: 'bigint',
                    },
                    {
                        name: 'artistId',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'albumId',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tracks');
    }

}

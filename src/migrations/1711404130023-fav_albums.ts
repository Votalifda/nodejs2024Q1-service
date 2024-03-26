import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class FavAlbums1711404130023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'fav_albums',
                columns: [
                    {
                        name: 'albumId',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('fav_albums');
    }
}

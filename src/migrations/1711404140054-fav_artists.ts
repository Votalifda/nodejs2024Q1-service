import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class FavArtists1711404140054 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'fav_artists',
                columns: [
                    {
                        name: 'artistId',
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
        await queryRunner.dropTable('fav_artists');
    }

}

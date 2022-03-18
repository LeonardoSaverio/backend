import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAddress1647345440460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
            name: 'address',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'uf',
                    type: 'char',
                    isNullable: false,
                    length: '2'
                },
                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: false,
                    length: '60'
                },
                {
                    name: 'street',
                    type: 'varchar',
                    isNullable: false,
                    length: '200'
                },
                {
                    name: 'number',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'lat',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'long',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'product_id',
                    type: 'uuid',
                    isNullable: false,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                }
            ],
            foreignKeys: [
                {
                    name: 'product_id',
                    columnNames: ['product_id'],
                    referencedTableName: 'product',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('address');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}

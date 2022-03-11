import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAddress1647015075333 implements MigrationInterface {

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
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
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
                }
            ],
            foreignKeys: [
                {
                    name: 'user_id',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
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

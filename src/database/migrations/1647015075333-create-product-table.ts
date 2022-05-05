import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { AdType, StatusAd } from '../../models/Product';

export class product1647015075333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',

                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                    length: '120'
                },
                {
                    name: 'brand',
                    type: 'varchar',
                    isNullable: false,
                    length: '60'
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false,
                    length: '60'
                },
                {
                    name: 'price',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'images',
                    type: 'varchar[]',
                    isNullable: false,
                },
                {
                    name: 'adType',
                    type: 'enum',
                    isArray: true,
                    enum: [AdType.SALE, AdType.RENT],
                    enumName: 'adType_enum',
                    default: `'{${AdType.RENT}}'`,
                    isNullable: true,

                },
                {
                    name: 'statusAd',
                    type: 'enum',
                    enum: [StatusAd.SOLD, StatusAd.RENTED, StatusAd.ANNOUNCED],
                    enumName: 'statusAd_enum',
                    default: `'${StatusAd.ANNOUNCED}'`,
                    isNullable: true,
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
                    name: 'user_id',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    name: 'user_id',
                    columnNames: ['user_id'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}

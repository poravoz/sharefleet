import { type } from "os"
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Vehicle1681191591231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vehicle_entity',
                columns: [
                    {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid",
                    isNullable: false
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'number_agency',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'number_car',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'price',
                        type: 'varchar',
                        isNullable: false
                    },
                ],
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vehicleEntity');
        const foreginKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('id') !== 1);

        await queryRunner.dropForeignKey('vehicleEntity' , foreginKey);
    }

}

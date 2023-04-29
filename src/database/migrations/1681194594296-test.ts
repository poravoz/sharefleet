import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class DriverEntity1681194594296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'DriverEntity',
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
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'number_phone',
                        type: 'varchar',
                        isNullable: false
                    },
                    
                ],
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('driver_entity');
        const foreginKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('id') !== 1);

        await queryRunner.dropForeignKey('driver_entity' , foreginKey);
    }

}

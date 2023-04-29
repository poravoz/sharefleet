import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { VehicleEntity } from 'src/vehicle/entities/vehicle.entity';
import { Vehicle1681191591231 } from 'src/database/migrations/1681191591231-test';
import { DriverEntity1681194594296 } from 'src/database/migrations/1681194594296-test';
import DriverEntity from 'src/driver/entities/driver.entity';

config();

new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "nestjs",
    logging: false,
    entities: [VehicleEntity, DriverEntity],
    migrations: [Vehicle1681191591231, DriverEntity1681194594296]
})
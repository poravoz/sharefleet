class Vehicle {
    public id: number;
    public content : string;
    public status : string;
    public number_agency : string;
    public number_car : string;
    public price: string;
    
}

class Driver {
    public id : number;
    public name: string;
    public number_phone: string;
}

export class VehicleAndDriver {
    public driver : Driver;
    public vehicle : Vehicle;
}


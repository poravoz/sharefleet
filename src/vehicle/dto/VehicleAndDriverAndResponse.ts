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

class Response {
    public id: number
    public name: string
    public response: string
}


export class VehicleAndDriverAndResponse {
    public driver : Driver;
    public vehicle : Vehicle;
    public response : Response;
}
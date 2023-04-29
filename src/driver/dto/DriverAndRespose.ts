class Driver {
    public id: number
    public name: string
    public number_phone: string
}

class Responses {
    public id: number
    public name: string
    public response: string
}

export class DriverAndResponse {
    public driver : Driver;
    public response : Responses;
}
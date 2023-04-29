export class VehicleExeption extends Error {
    constructor (public readonly message = 'Error') {
        super();
    }

    public what(): string {
        return this.message;
    }
}

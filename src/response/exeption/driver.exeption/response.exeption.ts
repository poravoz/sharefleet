export class ResponseExeption extends Error {
    constructor (public readonly message = 'Error') {
        super();
    }

    public what(): string {
        return this.message;
    }
}

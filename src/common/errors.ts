export class AppError extends Error {

    public redirect: boolean;

    constructor(message?: string, redirect: boolean = false) {
        super(message);
        this.redirect = redirect;
    }
}

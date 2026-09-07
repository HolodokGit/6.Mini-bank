"use strict"

export class BankError extends Error{
    constructor(message) {
        super(message);
        this.name = 'BankError'
    }
}

export class InsufficientFundsError extends BankError {
    constructor(message) {
        super(message);
        this.name = 'InsufficientFundsError';
    }
}

export class AccountNotFoundError extends BankError {
    constructor(message) {
        super(message);
        this.name = 'AccountNotFoundError'
    }
}
"use strict"

import { User } from '../models/User.js';
import { Account } from '../models/Account.js';
import { AccountNotFoundError, BankError, InsufficientFundsError } from '../utils/errors.js';

export class Bank {
    constructor() {
        this.users = new Map();
        this.accounts = new Map();
    }

    createUser(name) {
        let user = new User(name);
        this.users.set(user.id, user);
        return user;
    }

    createAccount(owner, name) {
        let account = new Account(owner, name);
        this.accounts.set(account.id, account);
        return account;
    }

    getAccount(id) {
        if(!this.accounts.has(id)) {
            throw new AccountNotFoundError('Аккаунт не найден!');
        }
        return this.accounts.get(id);
    }

    deposit(accountId, amount) {
        let account = this.getAccount(accountId);
        if( amount <= 0 ) {
            throw new BankError('Сумма должна быть больше 0!');
        }
        account.balance += amount;
        return account;
    }

    withdraw(accountId, amount) {
        let account = this.getAccount(accountId);
        if( amount <= 0 ) {
            throw new BankError('Сумма должна быть положительной');
        } else if ( amount > account.balance ) {
            throw new InsufficientFundsError('Недостаточно средств');
        }
        account.balance -= amount;
        return account;
    }
}
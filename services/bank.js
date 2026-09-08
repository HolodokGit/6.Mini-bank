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

    getAccount(accountId) {
        if(!this.accounts.has(accountId)) {
            throw new AccountNotFoundError('Аккаунт не найден!');
        }
        return this.accounts.get(accountId);
    }

    getHistory(accountId) {
        if(!this.accounts.has(accountId)) {
            throw new AccountNotFoundError('Аккаунт не найден!');
        }
        let account = this.accounts.get(accountId);
        return account.history;
    }

    deposit(accountId, amount) {
        let account = this.getAccount(accountId);
        if( amount <= 0 ) {
            throw new BankError('Сумма должна быть больше 0!');
        }
        account.balance += amount;
        account.addToHistory(`На счет ${account.name} зачисленно ${amount}\nОстаток: ${account.balance}`);
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
        account.addToHistory(`Со счета "${account.name}" списано ${amount}\nОстаток: ${account.balance}`);
        return account;
    }
}
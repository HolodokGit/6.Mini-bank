"use strict"

import { User } from '../models/User.js';
import { Account } from '../models/Account.js';

class Bank {
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
        return account.balance;
    }

    
}
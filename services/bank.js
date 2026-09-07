"use strict"

import { User } from '../models/User.js';

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
}
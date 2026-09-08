"use strict"

import { generateId } from "../utils/generateId.js";

export class Account {
    constructor(owner, name) {
        this.owner = owner;
        this.name = name;
        this.id = generateId();
        this._balance = 0;
        this.history = [];
    }

    addToHistory(entry) {
        this.history.push(entry);
    }

    toJSON() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            balance: this.balance,
            owner: this.owner.name,
        })
    }

    get balance(){
        return this._balance;
    }
}
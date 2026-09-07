"use strict"

import { generateId } from "../utils/generateId.js";

export class Account {
    constructor(owner, name) {
        this.owner = owner;
        this.name = name;
        this.id = generateId();
        this.balance = 0;
    }
}
"use strict"

import { generateId } from '../utils/generateId.js';

export class User {
    constructor(name) {
        this.id = generateId();
        this.name = name;
        this.balance = 0;
    }
}
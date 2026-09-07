"use strict"

import { Bank } from "./services/bank.js";

let bank = new Bank();

let user = bank.createUser('Дмитрий');
let account = bank.createAccount(user, 'Основной');

console.log(bank.deposit(account.id, 500));
console.log(bank.withdraw(account.id, 100));
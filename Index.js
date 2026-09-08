"use strict"

import { Bank } from "./services/bank.js";

let bank = new Bank();

let user = bank.createUser('Дмитрий');
let account1 = bank.createAccount(user, 'Основной');
let account2 = bank.createAccount(user, 'Накопительный');

console.log('Пополнение:');
bank.deposit(account1.id, 500);
console.log(bank.getAccount(account1.id));

console.log('Перевод:');
bank.transfer(account1.id, account2.id, 200);
console.log(bank.getAccount(account1.id));
console.log(bank.getAccount(account2.id));

console.log('История счета 1');
console.log(bank.getHistory(account1.id));

console.log('История счета 2');
console.log(bank.getHistory(account2.id));

console.log('Генератор истории');
for( let entry of bank.historyGenerator(account1.id)) {
    console.log(entry);
}
"use strict"

import { Bank } from "./services/bank.js";

async function main() {
    let bank = new Bank();
    let user = bank.createUser('Дмитрий');
    let account1 = bank.createAccount(user, 'Основной');
    let account2 = bank.createAccount(user, 'Накопительный');

    console.log('Пожалуйста подождите');
    await bank.deposit(account1.id, 500);
    await bank.transfer(account1.id, account2.id, 200);
    
    console.log('История 1:');
    for( let entry of bank.historyGenerator(account1.id)) {
        console.log(entry);
    }

    console.log('История 2:');
    for( let entry of bank.historyGenerator(account2.id)) {
        console.log(entry);
    }

    console.log('Счёт 1 в JSON');
    console.log(account1.toJSON());

    console.log('Все счета:');
    console.log(bank.exportAccounts()); 
}

main();
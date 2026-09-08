"use strict"

import { Bank } from '../services/bank.js';
import { AccountNotFoundError, InsufficientFundsError } from '../utils/errors.js';


describe("Bank", function() {
    it('Создание пользователя', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        assert.equal(user.name, 'John');
    });

    it('Создание счета', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        let account = bank.createAccount(user, 'Основной');
        assert.equal(account.owner, user);
        assert.equal(account.name, 'Основной');
    });

    it('Пополнение', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        let account = bank.createAccount(user, 'Основной');
        bank.deposit(account.id, 500);
        assert.equal(account.balance, 500);
    });

    it('Снятие', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        let account = bank.createAccount(user, 'Основной');
        bank.deposit(account.id, 500);
        bank.withdraw(account.id, 200);
        assert.equal(account.balance, 300);
    });

    it('Ошибка "недостаточно средств"', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        let account = bank.createAccount(user, 'Основной');
        assert.throws(
            () => bank.withdraw(account.id, 200),
            InsufficientFundsError
        );
    });

    it('Ошибка "аккаунт не найден"', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        let account = bank.createAccount(user, 'Основной');
        assert.throws(
            () => bank.getAccount('cdsacsda'),
            AccountNotFoundError
        );
    });

    it('История пополняется', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        let account = bank.createAccount(user, 'Основной');
        bank.deposit(account.id, 500);
        assert.equal(account.history.length, 1);
    });

    it('Перевод между счетами', function() {
        let bank = new Bank();
        let user = bank.createUser('John');
        let account1 = bank.createAccount(user, 'Основной');
        let account2 = bank.createAccount(user, 'Накопительный');
        bank.deposit(account1.id, 500);
        bank.transfer(account1.id, account2.id, 300);
        assert.equal(account1.balance, 200);
        assert.equal(account2.balance, 300);
    });
});
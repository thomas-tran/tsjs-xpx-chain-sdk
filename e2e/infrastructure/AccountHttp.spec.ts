/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {expect} from 'chai';
import {AccountHttp} from '../../src/infrastructure/AccountHttp';
import {QueryParams} from '../../src/infrastructure/QueryParams';

import { TestingAccount, MultisigAccount, APIUrl, CosignatoryAccount, Cosignatory2Account, Cosignatory3Account, TestingRecipient, TestingAccountAccountPropertyAddress, SeedAccount } from '../conf/conf.spec';
import { ConfUtils } from '../conf/ConfUtils';

const accountHttp = new AccountHttp(APIUrl);

describe('AccountHttp', () => {

    describe('getAccountInfo', () => {
        it('should return account data given a NEM Address', (done) => {
            accountHttp.getAccountInfo(TestingAccount.address)
                .subscribe((accountInfo) => {
                    expect(accountInfo.publicKey).to.be.equal(TestingAccount.publicKey);       
                    done();
            });
        });
    });

    describe('getAccountsInfo', () => {
        it('should return account data given a NEM Address', (done) => {
            accountHttp.getAccountsInfo([TestingAccount.address])
                .subscribe((accountsInfo) => {
                    expect(accountsInfo[0].publicKey).to.be.equal(TestingAccount.publicKey);
                    done();
                });
        });
    });

    describe('getMultisigAccountInfo', () => {
        it('should call getMultisigAccountInfo successfully', (done) => {
            accountHttp.getMultisigAccountInfo(MultisigAccount.address).subscribe((multisigAccountInfo) => {
                expect(multisigAccountInfo.account.publicKey).to.be.equal(MultisigAccount.publicKey);
                done();
            });
        });
    });

    describe('getAccountProperty', () => {
        it('should call getAccountProperty successfully', (done) => {
            ConfUtils.simplePropertyModificationBLockAddress(TestingAccount, TestingRecipient.address);
            accountHttp.getAccountProperty(TestingAccount.publicAccount).subscribe((accountProperty) => {
                expect(accountProperty.accountProperties!.address).to.be.equal(TestingAccountAccountPropertyAddress);
                done();
            });
        });
    });

    describe('getAccountProperties', () => {
        it('should call getAccountProperties successfully', (done) => {
            accountHttp.getAccountProperties([TestingAccount.address]).subscribe((accountProperties) => {
                expect(accountProperties[0]!.accountProperties!.address).to.be.equal(TestingAccountAccountPropertyAddress);
                done();
            });
        });
    });
    describe('getMultisigAccountGraphInfo', () => {
        it('should call getMultisigAccountGraphInfo successfully', (done) => {
            accountHttp.getMultisigAccountGraphInfo(MultisigAccount.address).subscribe((multisigAccountGraphInfo) => {
                expect(multisigAccountGraphInfo.multisigAccounts.get(0)![0].account.publicKey).to.be.equal(MultisigAccount.publicKey);
                done();
            });
        });
    });

    describe('incomingTransactions', () => {
        it('should call incomingTransactions successfully', (done) => {
            accountHttp.incomingTransactions(TestingAccount.publicAccount).subscribe((transactions) => {
                expect(transactions.length).to.be.greaterThan(0);
                done();
            });
        });
    });

    describe('outgoingTransactions', () => {
        let nextId: string;
        let lastId: string;

        it('should call outgoingTransactions successfully', (done) => {
            accountHttp.outgoingTransactions(TestingAccount.publicAccount).subscribe((transactions) => {
                expect(transactions.length).to.be.equal(10);
                done();
            });
        });
        it('should call outgoingTransactions successfully pageSize 11', (done) => {
            accountHttp.outgoingTransactions(TestingAccount.publicAccount, new QueryParams(22)).subscribe((transactions) => {
                expect(transactions.length).to.be.equal(22);
                nextId = transactions[10].transactionInfo!.id;
                lastId = transactions[11].transactionInfo!.id;
                done();
            });
        });

        it('should call outgoingTransactions successfully pageSize 11 and next id', (done) => {
            accountHttp.outgoingTransactions(TestingAccount.publicAccount, new QueryParams(11, nextId)).subscribe((transactions) => {
                expect(transactions.length).to.be.equal(11);
                expect(transactions[0].transactionInfo!.id).to.be.equal(lastId);
                done();
            });
        });
    });

    describe('aggregateBondedTransactions', () => {
        it('should call aggregateBondedTransactions successfully', (done) => {
            accountHttp.aggregateBondedTransactions(TestingAccount.publicAccount).subscribe((transactions) => {
                expect(transactions.length).to.be.equal(0);
                done();
            });
        });
    });

    describe('transactions', () => {
        it('should call transactions successfully', (done) => {
            accountHttp.transactions(TestingAccount.publicAccount).subscribe((transactions) => {
                expect(transactions.length).to.be.greaterThan(0);
                done();
            });
        });
    });

    describe('unconfirmedTransactions', () => {
        it('should call unconfirmedTransactions successfully', (done) => {
            accountHttp.unconfirmedTransactions(TestingAccount.publicAccount).subscribe((transactions) => {
                expect(transactions.length).to.be.equal(0);
                done();
            });
        });
    });
})

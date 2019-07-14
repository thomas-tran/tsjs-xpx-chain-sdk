/*
 * Copyright 2019 NEM
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
/**
 * Catapult REST Endpoints
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.7.16
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import localVarRequest = require('request');
import http = require('http');

/* tslint:disable:no-unused-locals */
import { AnnounceTransactionInfoDTO } from '../model/announceTransactionInfoDTO';
import { Cosignature } from '../model/cosignature';
import { TransactionHashes } from '../model/transactionHashes';
import { TransactionIds } from '../model/transactionIds';
import { TransactionInfoDTO } from '../model/transactionInfoDTO';
import { TransactionPayload } from '../model/transactionPayload';
import { TransactionStatusDTO } from '../model/transactionStatusDTO';

import { ObjectSerializer, Authentication, VoidAuth } from '../model/models';

let defaultBasePath = 'http://localhost:3000';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum TransactionRoutesApiApiKeys {
}

export class TransactionRoutesApi {
    protected _basePath = defaultBasePath;
    protected defaultHeaders: any = {};
    protected _useQuerystring: boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    public setApiKey(key: TransactionRoutesApiApiKeys, value: string) {
        (this.authentications as any)[TransactionRoutesApiApiKeys[key]].apiKey = value;
    }

    /**
     * Announces a [cosignature transaction](https://nemtech.github.io/concepts/aggregate-transaction.html#cosignature-transaction) to the network.
     * @summary Announce a cosignature transaction
     * @param cosignature
     */
    public async announceCosignatureTransaction(cosignature: Cosignature, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<{ response: http.ClientResponse; body: AnnounceTransactionInfoDTO; }> {
        const localVarPath = this.basePath + '/transaction/cosignature';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'cosignature' is not null or undefined
        if (cosignature === null || cosignature === undefined) {
            throw new Error('Required parameter cosignature was null or undefined when calling announceCosignatureTransaction.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(cosignature, "Cosignature")
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: AnnounceTransactionInfoDTO; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "AnnounceTransactionInfoDTO");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body);
                    } else {
                        reject({
                            statusCode: response.statusCode,
                            statusMessage: response.statusMessage
                        });
                    }
                }
            });
        });
    }
    /**
     * Announces an [aggregate bonded transaction](https://nemtech.github.io/concepts/aggregate-transaction.html#aggregate-bonded) to the network.
     * @summary Announce an aggregate bonded transaction
     * @param transactionPayload
     */
    public async announcePartialTransaction(transactionPayload: TransactionPayload, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<{ response: http.ClientResponse; body: AnnounceTransactionInfoDTO; }> {
        const localVarPath = this.basePath + '/transaction/partial';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'transactionPayload' is not null or undefined
        if (transactionPayload === null || transactionPayload === undefined) {
            throw new Error('Required parameter transactionPayload was null or undefined when calling announcePartialTransaction.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(transactionPayload, "TransactionPayload")
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: AnnounceTransactionInfoDTO; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "AnnounceTransactionInfoDTO");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body);
                    } else {
                        reject({
                            statusCode: response.statusCode,
                            statusMessage: response.statusMessage
                        });
                    }
                }
            });
        });
    }
    /**
     * Announces a transaction to the network. It is recommended to use the NEM2-SDK to announce transactions as they should be [serialized](https://nemtech.github.io/concepts/transaction.html#defining-a-transaction).
     * @summary Announce a new transaction
     * @param transactionPayload
     */
    public async announceTransaction(transactionPayload: TransactionPayload, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<{ response: http.ClientResponse; body: AnnounceTransactionInfoDTO; }> {
        const localVarPath = this.basePath + '/transaction';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'transactionPayload' is not null or undefined
        if (transactionPayload === null || transactionPayload === undefined) {
            throw new Error('Required parameter transactionPayload was null or undefined when calling announceTransaction.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(transactionPayload, "TransactionPayload")
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: AnnounceTransactionInfoDTO; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "AnnounceTransactionInfoDTO");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body);
                    } else {
                        reject({
                            statusCode: response.statusCode,
                            statusMessage: response.statusMessage
                        });
                    }
                }
            });
        });
    }
    /**
     * Returns transaction information given a transactionId or hash.
     * @summary Get transaction information
     * @param transactionId The transaction id or hash.
     */
    public async getTransaction(transactionId: string, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<{ response: http.ClientResponse; body: TransactionInfoDTO; }> {
        const localVarPath = this.basePath + '/transaction/{transactionId}'
            .replace('{' + 'transactionId' + '}', encodeURIComponent(String(transactionId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'transactionId' is not null or undefined
        if (transactionId === null || transactionId === undefined) {
            throw new Error('Required parameter transactionId was null or undefined when calling getTransaction.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: TransactionInfoDTO; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "TransactionInfoDTO");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body);
                    } else {
                        reject({
                            statusCode: response.statusCode,
                            statusMessage: response.statusMessage
                        });
                    }
                }
            });
        });
    }
    /**
     * Returns the transaction status for a given hash.
     * @summary Get transaction status
     * @param hash The transaction hash.
     */
    public async getTransactionStatus(hash: string, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<{ response: http.ClientResponse; body: TransactionStatusDTO; }> {
        const localVarPath = this.basePath + '/transaction/{hash}/status'
            .replace('{' + 'hash' + '}', encodeURIComponent(String(hash)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'hash' is not null or undefined
        if (hash === null || hash === undefined) {
            throw new Error('Required parameter hash was null or undefined when calling getTransactionStatus.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: TransactionStatusDTO; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "TransactionStatusDTO");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body);
                    } else {
                        reject({
                            statusCode: response.statusCode,
                            statusMessage: response.statusMessage
                        });
                    }
                }
            });
        });
    }
    /**
     * Returns transactions information for a given array of transactionIds.
     * @summary Get transactions information
     * @param transactionIds
     */
    public async getTransactions(transactionIds: TransactionIds, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<{ response: http.ClientResponse; body: Array<TransactionInfoDTO>; }> {
        const localVarPath = this.basePath + '/transaction';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'transactionIds' is not null or undefined
        if (transactionIds === null || transactionIds === undefined) {
            throw new Error('Required parameter transactionIds was null or undefined when calling getTransactions.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(transactionIds, "TransactionIds")
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: Array<TransactionInfoDTO>; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "Array<TransactionInfoDTO>");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body);
                    } else {
                        reject({
                            statusCode: response.statusCode,
                            statusMessage: response.statusMessage
                        });
                    }
                }
            });
        });
    }
    /**
     * Returns an array of transaction statuses for a given array of transaction hashes.
     * @summary Get transactions status.
     * @param transactionHashes
     */
    public async getTransactionsStatuses(transactionHashes: TransactionHashes, options: { headers: { [name: string]: string } } = { headers: {} }): Promise<{ response: http.ClientResponse; body: Array<TransactionStatusDTO>; }> {
        const localVarPath = this.basePath + '/transaction/statuses';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'transactionHashes' is not null or undefined
        if (transactionHashes === null || transactionHashes === undefined) {
            throw new Error('Required parameter transactionHashes was null or undefined when calling getTransactionsStatuses.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(transactionHashes, "TransactionHashes")
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.ClientResponse; body: Array<TransactionStatusDTO>; }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "Array<TransactionStatusDTO>");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve(body);
                    } else {
                        reject({
                            statusCode: response.statusCode,
                            statusMessage: response.statusMessage
                        });
                    }
                }
            });
        });
    }
}

/*
 * Copyright 2023 ProximaX
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
 * Catapult REST API Reference
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.7.15
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import http = require('http');
import axios from 'axios';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

/* tslint:disable:no-unused-locals */
import { BlockInfoDTO } from '../model/blockInfoDTO';
import { MerkleProofInfoDTO } from '../model/merkleProofInfoDTO';
import { StatementsDTO } from '../model/statementsDTO';
import { TransactionInfoDTO } from '../model/transactionInfoDTO';
import { TransactionSearchDTO } from '../model/transactionSearchDTO';

import { ObjectSerializer} from '../model/models';
import { RequestOptions } from '../RequestOptions';

import { HttpError, RequestFile } from './apis';
import { TransactionQueryParams } from '../TransactionQueryParams';

let defaultBasePath = 'http://localhost:3000';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum BlockRoutesApiApiKeys {
}

export class BlockRoutesApi {
    protected _basePath = defaultBasePath;
    protected _defaultHeaders : { [name: string]: string; } = { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    };
    protected _useQuerystring : boolean = false;

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

    set defaultHeaders(defaultHeaders: any) {
        this._defaultHeaders = defaultHeaders;
    }

    get defaultHeaders() {
        return this._defaultHeaders;
    }

    get basePath() {
        return this._basePath;
    }

    combineHeaders(reqOptions?:RequestOptions){
        return reqOptions ? {...this._defaultHeaders, ...reqOptions.headers} : this._defaultHeaders;
    }

    /**
     * Gets a block from the chain that has the given height.
     * @summary Get block information
     * @param height The height of the block.
     */
    public async getBlockByHeight (height: number, reqOptions?:RequestOptions) : Promise<{ response: AxiosResponse; body: BlockInfoDTO;  }> {
        const localVarPath = '/block/{height}'
            .replace('{' + 'height' + '}', encodeURIComponent(String(height)));
        let localVarQueryParameters: any = {};

        // verify required parameter 'height' is not null or undefined
        if (height === null || height === undefined) {
            throw new Error('Required parameter height was null or undefined when calling getBlockByHeight.');
        }

        let requestHeaders = this.combineHeaders(reqOptions);

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: requestHeaders,
            url: localVarPath,
            baseURL: this.basePath,
            responseType: 'json'
        };

        return new Promise<{ response: AxiosResponse; body: BlockInfoDTO;  }>((resolve, reject) => {
            axios(localVarRequestOptions).then(
                (response)=>{
                    let body = ObjectSerializer.deserialize(response.data, "BlockInfoDTO");
                    if (response.status && response.status >= 200 && response.status <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                         reject(response);
                    }
                },
                (error: AxiosError ) => {
                    reject(error);
                }
            );
        });
    }
    /**
     * Returns the [receipts](https://nemtech.github.io/concepts/receipt.html) linked to a block.
     * @summary Get receipts from a block
     * @param height The height of the block.
     */
    public async getBlockReceipts (height: number, reqOptions?:RequestOptions) : Promise<{ response: AxiosResponse; body: StatementsDTO;  }> {
        const localVarPath = '/block/{height}/receipts'
            .replace('{' + 'height' + '}', encodeURIComponent(String(height)));

        // verify required parameter 'height' is not null or undefined
        if (height === null || height === undefined) {
            throw new Error('Required parameter height was null or undefined when calling getBlockReceipts.');
        }

        let requestHeaders = this.combineHeaders(reqOptions);

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: requestHeaders,
            url: localVarPath,
            baseURL: this.basePath,
            responseType: 'json'
        };

        return new Promise<{ response: AxiosResponse; body: StatementsDTO;  }>((resolve, reject) => {
            axios(localVarRequestOptions).then(
                (response)=>{
                    let body = ObjectSerializer.deserialize(response.data, "StatementsDTO");
                    if (response.status && response.status >= 200 && response.status <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                         reject(response);
                    }
                },
                (error: AxiosError ) => {
                    reject(error);
                }
            );
        });
    }
    /**
     * Returns an array of [transactions](https://nemtech.github.io/concepts/transaction.html) included in a block for a given block height.
     * @summary Get transactions from a block
     * @param transaction Query Params
     * @param id The transaction id up to which transactions are returned.
     */
    public async getBlockTransactions (height: number, transactionQueryParams?: TransactionQueryParams, reqOptions?:RequestOptions) : Promise<{ response: AxiosResponse; body: TransactionSearchDTO;  }> {
        const localVarPath = '/transactions/confirmed';
        
        // verify required parameter 'height' is not null or undefined
        if (height === null || height === undefined) {
            throw new Error('Required parameter height was null or undefined when calling getBlockTransactions.');
        }

        let localVarQueryParameters: any = {};

        if(transactionQueryParams){
            localVarQueryParameters = transactionQueryParams.buildQueryParams();
        }

        localVarQueryParameters['height'] = height;
        localVarQueryParameters['embedded'] = "true";

        let requestHeaders = this.combineHeaders(reqOptions);

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: requestHeaders,
            url: localVarPath,
            baseURL: this.basePath,
            responseType: 'json',
            params: localVarQueryParameters
        };

        return new Promise<{ response: AxiosResponse; body: TransactionSearchDTO;  }>((resolve, reject) => {
            axios(localVarRequestOptions).then(
                (response)=>{
                    let body = ObjectSerializer.deserialize(response.data, "TransactionSearchDTO");
                    if (response.status && response.status >= 200 && response.status <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                         reject(response);
                    }
                },
                (error: AxiosError ) => {
                    reject(error);
                }
            );
        });
    }
    /**
     * Gets up to limit number of blocks after given block height.
     * @summary Get blocks information
     * @param height The height of the block. If height -1 is not a multiple of the limit provided, the inferior closest multiple + 1 is used instead.
     * @param limit The number of blocks to be returned.
     */
    public async getBlocksByHeightWithLimit (height: number, limit: 25 | 50 | 75 | 100, reqOptions?:RequestOptions) : Promise<{ response: AxiosResponse; body: Array<BlockInfoDTO>;  }> {
        const localVarPath = '/blocks/{height}/limit/{limit}'
            .replace('{' + 'height' + '}', encodeURIComponent(String(height)))
            .replace('{' + 'limit' + '}', encodeURIComponent(String(limit)));
        let localVarQueryParameters: any = {};

        // verify required parameter 'height' is not null or undefined
        if (height === null || height === undefined) {
            throw new Error('Required parameter height was null or undefined when calling getBlocksByHeightWithLimit.');
        }

        // verify required parameter 'limit' is not null or undefined
        if (limit === null || limit === undefined) {
            throw new Error('Required parameter limit was null or undefined when calling getBlocksByHeightWithLimit.');
        }

        let requestHeaders = this.combineHeaders(reqOptions);

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: requestHeaders,
            url: localVarPath,
            baseURL: this.basePath,
            responseType: 'json'
        };

        return new Promise<{ response: AxiosResponse; body: Array<BlockInfoDTO>;  }>((resolve, reject) => {
            axios(localVarRequestOptions).then(
                (response)=>{
                    let body = ObjectSerializer.deserialize(response.data, "Array<BlockInfoDTO>");
                    if (response.status && response.status >= 200 && response.status <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                         reject(response);
                    }
                },
                (error: AxiosError ) => {
                    reject(error);
                }
            );
        });
    }
    /**
     * Returns the merkle path for a [receipt statement or resolution](https://nemtech.github.io/concepts/receipt.html) linked to a block. The path is the complementary data needed to calculate the merkle root. A client can compare if the calculated root equals the one recorded in the block header, verifying that the receipt was linked with the block.
     * @summary Get the merkle path for a given a receipt statement hash and block
     * @param height The height of the block.
     * @param hash The hash of the receipt statement or resolution.
     */
    public async getMerkleReceipts (height: number, hash: string, reqOptions?:RequestOptions) : Promise<{ response: AxiosResponse; body: MerkleProofInfoDTO;  }> {
        const localVarPath = '/block/{height}/receipt/{hash}/merkle'
            .replace('{' + 'height' + '}', encodeURIComponent(String(height)))
            .replace('{' + 'hash' + '}', encodeURIComponent(String(hash)));
        let localVarQueryParameters: any = {};
        
        // verify required parameter 'height' is not null or undefined
        if (height === null || height === undefined) {
            throw new Error('Required parameter height was null or undefined when calling getMerkleReceipts.');
        }

        // verify required parameter 'hash' is not null or undefined
        if (hash === null || hash === undefined) {
            throw new Error('Required parameter hash was null or undefined when calling getMerkleReceipts.');
        }

        let requestHeaders = this.combineHeaders(reqOptions);

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: requestHeaders,
            url: localVarPath,
            baseURL: this.basePath,
            responseType: 'json'
        };

        return new Promise<{ response: AxiosResponse; body: MerkleProofInfoDTO;  }>((resolve, reject) => {
            axios(localVarRequestOptions).then(
                (response)=>{
                    let body = ObjectSerializer.deserialize(response.data, "MerkleProofInfoDTO");
                    if (response.status && response.status >= 200 && response.status <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                         reject(response);
                    }
                },
                (error: AxiosError ) => {
                    reject(error);
                }
            );
        });
    }
    /**
     * Returns the merkle path for a [transaction](https://nemtech.github.io/concepts/transaction.html) included in a block. The path is the complementary data needed to calculate the merkle root. A client can compare if the calculated root equals the one recorded in the block header, verifying that the transaction was included in the block.
     * @summary Get the merkle path for a given a transaction and block
     * @param height The height of the block.
     * @param hash The hash of the transaction.
     */
    public async getMerkleTransaction (height: number, hash: string, reqOptions?:RequestOptions) : Promise<{ response: AxiosResponse; body: MerkleProofInfoDTO;  }> {
        const localVarPath = '/block/{height}/transaction/{hash}/merkle'
            .replace('{' + 'height' + '}', encodeURIComponent(String(height)))
            .replace('{' + 'hash' + '}', encodeURIComponent(String(hash)));

        // verify required parameter 'height' is not null or undefined
        if (height === null || height === undefined) {
            throw new Error('Required parameter height was null or undefined when calling getMerkleTransaction.');
        }

        // verify required parameter 'hash' is not null or undefined
        if (hash === null || hash === undefined) {
            throw new Error('Required parameter hash was null or undefined when calling getMerkleTransaction.');
        }

        let requestHeaders = this.combineHeaders(reqOptions);

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            headers: requestHeaders,
            url: localVarPath,
            baseURL: this.basePath,
            responseType: 'json'
        };

        return new Promise<{ response: AxiosResponse; body: MerkleProofInfoDTO;  }>((resolve, reject) => {
            axios(localVarRequestOptions).then(
                (response)=>{
                    let body = ObjectSerializer.deserialize(response.data, "MerkleProofInfoDTO");
                    if (response.status && response.status >= 200 && response.status <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                         reject(response);
                    }
                },
                (error: AxiosError ) => {
                    reject(error);
                }
            );
        });
    }
}

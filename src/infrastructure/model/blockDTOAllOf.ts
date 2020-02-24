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

import { RequestFile } from '../api';

export class BlockDTOAllOf {
    'height': Array<number>;
    'timestamp': Array<number>;
    'difficulty': Array<number>;
    /**
    * The fee multiplier applied to transactions contained in block.
    */
    'feeMultiplier': number;
    /**
    * The hash of the previous block.
    */
    'previousBlockHash': string;
    /**
    * The transactions included in a block are hashed forming a merkle tree. The root of the tree summarizes them. 
    */
    'blockTransactionsHash': string;
    /**
    * The collection of receipts  are hashed into a merkle tree and linked  to a block. The block header stores the root hash. 
    */
    'blockReceiptsHash': string;
    /**
    * For each block, the state of the blockchain is stored in RocksDB,  forming a patricia tree. The root of the tree summarizes the state of the blockchain for the given block. 
    */
    'stateHash': string;
    /**
    * The public key of the optional beneficiary designated by harvester.
    */
    'beneficiary': string;
    /**
    * The part of the transaction fee harvester is willing to get. From 0 up to FeeInterestDenominator. The customer gets (FeeInterest / FeeInterestDenominator)\'th part of the maximum transaction fee.
    */
    'feeInterest': number;
    /**
    * Denominator of the transaction fee.
    */
    'feeInterestDenominator': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "height",
            "baseName": "height",
            "type": "Array<number>"
        },
        {
            "name": "timestamp",
            "baseName": "timestamp",
            "type": "Array<number>"
        },
        {
            "name": "difficulty",
            "baseName": "difficulty",
            "type": "Array<number>"
        },
        {
            "name": "feeMultiplier",
            "baseName": "feeMultiplier",
            "type": "number"
        },
        {
            "name": "previousBlockHash",
            "baseName": "previousBlockHash",
            "type": "string"
        },
        {
            "name": "blockTransactionsHash",
            "baseName": "blockTransactionsHash",
            "type": "string"
        },
        {
            "name": "blockReceiptsHash",
            "baseName": "blockReceiptsHash",
            "type": "string"
        },
        {
            "name": "stateHash",
            "baseName": "stateHash",
            "type": "string"
        },
        {
            "name": "beneficiary",
            "baseName": "beneficiary",
            "type": "string"
        },
        {
            "name": "feeInterest",
            "baseName": "feeInterest",
            "type": "number"
        },
        {
            "name": "feeInterestDenominator",
            "baseName": "feeInterestDenominator",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return BlockDTOAllOf.attributeTypeMap;
    }
}

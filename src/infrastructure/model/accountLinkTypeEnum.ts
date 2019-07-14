// Copyright 2019 ProximaX Limited. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file

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


/**
* The account link types: * 0 -  Unlinked. Account is not linked to another account. * 1 -  Main. Account is a balance-holding account that is linked to a remote harvester account. * 2 -  Remote. Account is a remote harvester account that is linked to a balance-holding account. * 3 -  Remote_Unlinked. Account is a remote harvester eligible account that is unlinked. 
*/
export class AccountLinkTypeEnum {

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    ];

    static getAttributeTypeMap() {
        return AccountLinkTypeEnum.attributeTypeMap;
    }
}


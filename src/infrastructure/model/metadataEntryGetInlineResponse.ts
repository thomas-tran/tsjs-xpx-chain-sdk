/**
 * Copyright 2021 ProximaX
 * 
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
import { MetaDataEntryDTO } from './metadataEntryDTO';

export class MetadataEntryGetInlineResponse {
    'metadataEntry': MetaDataEntryDTO;
    'id': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "metadataEntry",
            "baseName": "metadataEntry",
            "type": "MetaDataEntryDTO"
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        }   
    ];

    static getAttributeTypeMap() {
        return MetadataEntryGetInlineResponse.attributeTypeMap;
    }
}


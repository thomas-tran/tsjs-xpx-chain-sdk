/*
 * Copyright 2023 ProximaX
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
import {from as observableFrom, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Convert as convert, RawAddress as AddressLibrary} from '../core/format';
import {Address} from '../model/account/Address';
import {PublicAccount} from '../model/account/PublicAccount';
import {MosaicId} from '../model/mosaic/MosaicId';
import {AddressAlias} from '../model/namespace/AddressAlias';
import {Alias} from '../model/namespace/Alias';
import {AliasType} from '../model/namespace/AliasType';
import {EmptyAlias} from '../model/namespace/EmptyAlias';
import {MosaicAlias} from '../model/namespace/MosaicAlias';
import {NamespaceId} from '../model/namespace/NamespaceId';
import {NamespaceInfo} from '../model/namespace/NamespaceInfo';
import {NamespaceName} from '../model/namespace/NamespaceName';
import {UInt64} from '../model/UInt64';
import { NamespaceRoutesApi } from './api';
import {Http} from './Http';
import {NamespaceRepository} from './NamespaceRepository';
import {NetworkHttp} from './NetworkHttp';
import {QueryParams} from './QueryParams';
import { RequestOptions } from './RequestOptions';

/**
 * Namespace http repository.
 *
 * @since 1.0
 */
export class NamespaceHttp extends Http implements NamespaceRepository {
    /**
     * @internal
     * xpx chain Library namespace routes api
     */
    private namespaceRoutesApi: NamespaceRoutesApi;

    /**
     * Constructor
     * @param url
     * @param networkHttp
     */
    constructor(url: string, networkHttp?: NetworkHttp) {
        networkHttp = networkHttp == null ? new NetworkHttp(url) : networkHttp;
        super(networkHttp);
        this.namespaceRoutesApi = new NamespaceRoutesApi(url);
    }

    /**
     * Gets the NamespaceInfo for a given namespaceId
     * @param namespaceId - Namespace id
     * @returns Observable<NamespaceInfo>
     */
    public getNamespace(namespaceId: NamespaceId, requestOptions?: RequestOptions): Observable<NamespaceInfo> {
        return this.getNetworkTypeObservable(requestOptions).pipe(
            mergeMap((networkType) => observableFrom(
                this.namespaceRoutesApi.getNamespace(namespaceId.toHex(), requestOptions)).pipe(map(response => {
                    const namespaceInfoDTO = response.body;
                return new NamespaceInfo(
                    namespaceInfoDTO.meta.active,
                    namespaceInfoDTO.meta.index,
                    namespaceInfoDTO.meta.id,
                    namespaceInfoDTO.namespace.type as number,
                    namespaceInfoDTO.namespace.depth,
                    this.extractLevels(namespaceInfoDTO.namespace),
                    new NamespaceId(namespaceInfoDTO.namespace.parentId),
                    PublicAccount.createFromPublicKey(namespaceInfoDTO.namespace.owner, networkType),
                    new UInt64(namespaceInfoDTO.namespace.startHeight),
                    new UInt64(namespaceInfoDTO.namespace.endHeight),
                    this.extractAlias(namespaceInfoDTO.namespace),
                );
            }))));
    }

    /**
     * Gets array of NamespaceInfo for an account
     * @param address - Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<NamespaceInfo[]>
     */
    public getNamespacesFromAccount(address: Address,
                                    queryParams?: QueryParams, requestOptions?: RequestOptions): Observable<NamespaceInfo[]> {
        return this.getNetworkTypeObservable(requestOptions).pipe(
            mergeMap((networkType) => observableFrom(
                this.namespaceRoutesApi.getNamespacesFromAccount(address.plain(),
                                                                 this.queryParams(queryParams).pageSize,
                                                                 this.queryParams(queryParams).id,
                                                                 requestOptions)).pipe(
                map(response => {
                    return response.body.map((namespaceInfoDTO) => {
                        return new NamespaceInfo(
                            namespaceInfoDTO.meta.active,
                            namespaceInfoDTO.meta.index,
                            namespaceInfoDTO.meta.id,
                            namespaceInfoDTO.namespace.type as number,
                            namespaceInfoDTO.namespace.depth,
                            this.extractLevels(namespaceInfoDTO.namespace),
                            new NamespaceId(namespaceInfoDTO.namespace.parentId),
                            PublicAccount.createFromPublicKey(namespaceInfoDTO.namespace.owner, networkType),
                            new UInt64(namespaceInfoDTO.namespace.startHeight),
                            new UInt64(namespaceInfoDTO.namespace.endHeight),
                            this.extractAlias(namespaceInfoDTO.namespace),
                        );
                    });
                }))));
    }

    /**
     * Gets array of NamespaceInfo for different account
     * @param addresses - Array of Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<NamespaceInfo[]>
     */
    public getNamespacesFromAccounts(addresses: Address[],
                                     queryParams?: QueryParams, requestOptions?: RequestOptions): Observable<NamespaceInfo[]> {
        const publicKeysBody = {
            addresses: addresses.map((address) => address.plain()),
        };
        return this.getNetworkTypeObservable(requestOptions).pipe(
            mergeMap((networkType) => observableFrom(
                this.namespaceRoutesApi.getNamespacesFromAccounts(publicKeysBody,
                                                                  this.queryParams(queryParams).pageSize,
                                                                  this.queryParams(queryParams).id,
                                                                  requestOptions)).pipe(
                map(response => {
                    return response.body.map((namespaceInfoDTO) => {
                        return new NamespaceInfo(
                            namespaceInfoDTO.meta.active,
                            namespaceInfoDTO.meta.index,
                            namespaceInfoDTO.meta.id,
                            namespaceInfoDTO.namespace.type as number,
                            namespaceInfoDTO.namespace.depth,
                            this.extractLevels(namespaceInfoDTO.namespace),
                            new NamespaceId(namespaceInfoDTO.namespace.parentId),
                            PublicAccount.createFromPublicKey(namespaceInfoDTO.namespace.owner, networkType),
                            new UInt64(namespaceInfoDTO.namespace.startHeight),
                            new UInt64(namespaceInfoDTO.namespace.endHeight),
                            this.extractAlias(namespaceInfoDTO.namespace),
                        );
                    });
                }))));
    }

    /**
     * Gets array of NamespaceName for different namespaceIds
     * @param namespaceIds - Array of namespace ids
     * @returns Observable<NamespaceName[]>
     */
    public getNamespacesName(namespaceIds: NamespaceId[], requestOptions?: RequestOptions): Observable<NamespaceName[]> {
        const namespaceIdsBody = {
            namespaceIds: namespaceIds.map((id) => id.toHex()),
        };
        return observableFrom(
            this.namespaceRoutesApi.getNamespacesNames(namespaceIdsBody, requestOptions)).pipe(map(response => {
            return response.body.map((namespaceNameDTO) => {
                return new NamespaceName(
                    new NamespaceId(namespaceNameDTO.namespaceId),
                    namespaceNameDTO.name
                );
            });
        }));
    }

    /**
     * Gets the MosaicId from a MosaicAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returns Observable<MosaicId | null>
     */
    public getLinkedMosaicId(namespaceId: NamespaceId, requestOptions?: RequestOptions): Observable<MosaicId> {
        return observableFrom(
            this.namespaceRoutesApi.getNamespace(namespaceId.toHex(), requestOptions)).pipe(
            map(response => {
                const namespaceInfoDTO = response.body;
                if (namespaceInfoDTO.namespace === undefined) {
                    // forward js-xpx-chain-rest error
                    throw namespaceInfoDTO;
                }

                if (namespaceInfoDTO.namespace.alias.type.valueOf() === AliasType.None
                    || namespaceInfoDTO.namespace.alias.type.valueOf() !== AliasType.Mosaic
                    || !namespaceInfoDTO.namespace.alias.mosaicId) {
                    throw new Error('No mosaicId is linked to namespace \'' + namespaceInfoDTO.namespace.level0 + '\'');
                }
                return new MosaicId(namespaceInfoDTO.namespace.alias.mosaicId);
            }));
    }

    /**
     * Gets the Address from a AddressAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returns Observable<Address>
     */
    public getLinkedAddress(namespaceId: NamespaceId, requestOptions?: RequestOptions): Observable<Address> {
        return observableFrom(
            this.namespaceRoutesApi.getNamespace(namespaceId.toHex(), requestOptions)).pipe(
            map(response => {
                const namespaceInfoDTO = response.body;
                if (namespaceInfoDTO.namespace === undefined) {
                    // forward js-xpx-chain-rest error
                    throw namespaceInfoDTO;
                }

                if (namespaceInfoDTO.namespace.alias.type.valueOf() === AliasType.None
                    || namespaceInfoDTO.namespace.alias.type.valueOf() !== AliasType.Address
                    || !namespaceInfoDTO.namespace.alias.address) {
                    throw new Error('No address is linked to namespace \'' + namespaceInfoDTO.namespace.level0 + '\'');
                }

                const addressDecoded = namespaceInfoDTO.namespace.alias.address;
                const address = AddressLibrary.addressToString(convert.hexToUint8(addressDecoded));
                return Address.createFromRawAddress(address);
            }));
    }

    private extractLevels(namespace: any): NamespaceId[] {
        const result: NamespaceId[] = [];
        if (namespace.level0) {
            result.push(new NamespaceId(namespace.level0));
        }
        if (namespace.level1) {
            result.push(new NamespaceId(namespace.level1));
        }
        if (namespace.level2) {
            result.push(new NamespaceId(namespace.level2));
        }
        return result;
    }

    /**
     * Extract the alias from a namespace
     *
     * @internal
     * @access private
     * @param namespace
     */
    private extractAlias(namespace: any): Alias {
        if (namespace.alias && namespace.alias.type === AliasType.Mosaic) {
            return new MosaicAlias(namespace.alias.type, new MosaicId(namespace.alias.mosaicId));
        } else if (namespace.alias && namespace.alias.type === AliasType.Address) {
            const addressDecoded = namespace.alias.address;
            const address = AddressLibrary.addressToString(convert.hexToUint8(addressDecoded));
            return new AddressAlias(namespace.alias.type, Address.createFromRawAddress(address));
        }

        return new EmptyAlias();
    }
}

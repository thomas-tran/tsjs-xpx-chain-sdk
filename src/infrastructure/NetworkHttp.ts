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
import {map} from 'rxjs/operators';
import {NetworkType} from '../model/blockchain/NetworkType';
import { NetworkRoutesApi, NetworkTypeResponse } from './api';
import {Http} from './Http';
import {NetworkRepository} from './NetworkRepository';
import { RequestOptions } from './RequestOptions';

/**
 * Network http repository.
 *
 * @since 1.0
 */
export class NetworkHttp extends Http implements NetworkRepository {
    /**
     * @internal
     * xpx chain Library account routes api
     */
    private networkRoutesApi: NetworkRoutesApi;

    /**
     * Constructor
     * @param url
     */
    constructor(url: string) {
        super();
        this.networkRoutesApi = new NetworkRoutesApi(url);

    }

    /**
     * Get current network type.
     *
     * @return network type enum.
     */
    public getNetworkType(requestOptions?: RequestOptions): Observable<NetworkType> {
        return observableFrom(this.networkRoutesApi.getNetworkType(requestOptions)).pipe(
          map((response: NetworkTypeResponse) => {
          const networkTypeDTO = response.body;
            if (networkTypeDTO.name === 'mijinTest') {
              return NetworkType.MIJIN_TEST;
            } else if (networkTypeDTO.name === 'mijin') {
              return NetworkType.MIJIN;
            } else if (networkTypeDTO.name === 'testnet' || networkTypeDTO.name === 'publicTest') {
              return NetworkType.TEST_NET;
            } else if (networkTypeDTO.name === 'mainnet' || networkTypeDTO.name === 'public') {
              return NetworkType.MAIN_NET;
            } else if (networkTypeDTO.name === 'privateTest') {
              return NetworkType.PRIVATE_TEST;
            } else if (networkTypeDTO.name === 'private') {
                return NetworkType.PRIVATE;
            } else {
                throw new Error('network ' + networkTypeDTO.name + ' is not supported yet by the sdk');
            }
        }));
    }
}

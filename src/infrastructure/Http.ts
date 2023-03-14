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

import {Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {NetworkType} from '../model/blockchain/NetworkType';
import {NetworkHttp} from './NetworkHttp';
import {PageQueryParams} from './PageQueryParams';
import { QueryParams } from './QueryParams';
import { RequestOptions } from './RequestOptions';
/**
 * Http extended by all http services
 */
export abstract class Http {
    private networkHttp: NetworkHttp;
    private networkType: NetworkType;

    /**
     * Constructor
     * @param url
     * @param networkHttp
     */
    constructor(networkHttp?: NetworkHttp) {
        if (networkHttp) {
            this.networkHttp = networkHttp;
        }
    }

    getNetworkTypeObservable(requestOptions?: RequestOptions): Observable<NetworkType> {
        let networkTypeResolve;
        if (this.networkType == null) {
            networkTypeResolve = this.networkHttp.getNetworkType(requestOptions).pipe(map((networkType: NetworkType) => {
                this.networkType = networkType;
                return networkType;
            }));
        } else {
            networkTypeResolve = observableOf(this.networkType);
        }
        return networkTypeResolve;
    }

    queryParams(queryParams?: QueryParams): any {
        return {
            pageSize: queryParams ? queryParams.pageSize : undefined,
            id: queryParams ? queryParams.id : undefined,
            order: queryParams ? queryParams.order : undefined,
        };
    }

    pageQueryParams(queryParams?: PageQueryParams): any {
        return {
            page: queryParams ? queryParams.page : undefined,
            pageSize: queryParams ? queryParams.pageSize : undefined
        };
    }
}

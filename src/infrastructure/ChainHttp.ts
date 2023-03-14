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

import {from as observableFrom, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BlockchainScore} from '../model/blockchain/BlockchainScore';
import {UInt64} from '../model/UInt64';
import { BlockchainScoreResponse, ChainRoutesApi, HeightInfoResponse } from './api';
import { ChainRepository } from './ChainRepository';
import {Http} from './Http';
import { RequestOptions } from './RequestOptions';

/**
 * Chain http repository.
 *
 * @since 1.0
 */
export class ChainHttp extends Http implements ChainRepository {
    /**
     * @internal
     * xpx chain Library chain routes api
     */
    private chainRoutesApi: ChainRoutesApi;

    /**
     * Constructor
     * @param url
     */
    constructor(url: string) {
        super();
        this.chainRoutesApi = new ChainRoutesApi(url);
    }

    /**
     * Gets current blockchain height
     * @returns Observable<UInt64>
     */
    public getBlockchainHeight(requestOptions?: RequestOptions): Observable<UInt64> {
        return observableFrom(this.chainRoutesApi.getBlockchainHeight(requestOptions))
        .pipe(
            map((response: HeightInfoResponse) => {
                return new UInt64(response.body.height);
            })
        );
    }

    /**
     * Gets current blockchain score
     * @returns Observable<BlockchainScore>
     */
    public getBlockchainScore(requestOptions?: RequestOptions): Observable<BlockchainScore> {
        return observableFrom(this.chainRoutesApi.getBlockchainScore(requestOptions))
        .pipe(
            map((response: BlockchainScoreResponse) => {
                const blockchainScoreDTO = response.body;
                return new BlockchainScore(
                    new UInt64(blockchainScoreDTO.scoreLow),
                    new UInt64(blockchainScoreDTO.scoreHigh),
                );
            })
        );
    }
}

// Copyright 2019 ProximaX Limited. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file

/**
 * @module transactions/NamespaceMetadataTransaction
 */
import {Convert as convert} from '../../core/format';
import { VerifiableTransaction } from './VerifiableTransaction';
import NamespaceMetadataTransactionSchema from '../schemas/NamespaceMetadataTransactionSchema';
import {MetadataTransactionBuffer} from '../buffers/MetadataTransactionBuffer';

const { flatbuffers } = require('flatbuffers');

export default class NamespaceMetadataTransaction extends VerifiableTransaction {
    constructor(bytes) {
        super(bytes, NamespaceMetadataTransactionSchema);
    }
}

export class Builder {
    size: number;
    fee: number[];
    version: number;
    type: number;
    deadline: number[];
    targetPublicKey: string;
    scopedMetadataKey: number[];
    targetNamespaceId: number[];
    valueSizeDelta: number;
    value: string | null;
    oldValue: string | null;
    valueSize: number;
    valueDifferences: Uint8Array;

    constructor() {
        this.fee = [0, 0];
        this.version = 1;
    }

    addSize(size: number) {
        this.size = size;
        return this;
    }

    addMaxFee(fee: number[]) {
        this.fee = fee;
        return this;
    }

    addVersion(version: number) {
        this.version = version;
        return this;
    }

    addType(type: number) {
        this.type = type;
        return this;
    }

    addDeadline(deadline: number[]) {
        this.deadline = deadline;
        return this;
    }

    addTargetPublicKey(targetPublicKey: string) {
        this.targetPublicKey = targetPublicKey;
        return this;
    }

    addScopedMetadataKey(scopedMetadataKey: number[]) {
        this.scopedMetadataKey = scopedMetadataKey;
        return this;
    }

    addTargetNamespaceId(targetNamespaceId: number[]) {
        this.targetNamespaceId = targetNamespaceId;
        return this;
    }

    addValueSizeDelta(valueSizeDelta: number) {
        this.valueSizeDelta = valueSizeDelta;
        return this;
    }

    addValue(value: string | null) {
        this.value = value;
        return this;
    }

    addOldValue(oldValue: string | null) {
        this.oldValue = oldValue;
        return this;
    }

    addValueSize(valueSize: number) {
        this.valueSize = valueSize;
        return this;
    }

    addValueDifferences(valueDifferences: Uint8Array) {
        this.valueDifferences = valueDifferences;
        return this;
    }

    build() {
        const builder = new flatbuffers.Builder(1);

        const targetIdUint8 = new Uint32Array(this.targetNamespaceId);

        // Create vectors
        const signatureVector = MetadataTransactionBuffer
            .createSignatureVector(builder, Array(...Array(64)).map(Number.prototype.valueOf, 0));
        const signerVector = MetadataTransactionBuffer.createSignerVector(builder, Array(...Array(32)).map(Number.prototype.valueOf, 0));
        const deadlineVector = MetadataTransactionBuffer.createDeadlineVector(builder, this.deadline);
        const feeVector = MetadataTransactionBuffer.createMaxFeeVector(builder, this.fee);
        const targetKeyVector = MetadataTransactionBuffer.createTargetKeyVector(builder, convert.hexToUint8(this.targetPublicKey));
        const scopedMetadataKeyVector = MetadataTransactionBuffer.createScopedMetadataKeyVector(builder, this.scopedMetadataKey);
        const targetIdVector = MetadataTransactionBuffer.createTargetIdVector(builder, targetIdUint8);
        const valueVector = MetadataTransactionBuffer.createValueVector(builder, this.valueDifferences);

        MetadataTransactionBuffer.startMetadataTransactionBuffer(builder);
        MetadataTransactionBuffer.addSize(builder, this.size);
        MetadataTransactionBuffer.addSignature(builder, signatureVector);
        MetadataTransactionBuffer.addSigner(builder, signerVector);
        MetadataTransactionBuffer.addVersion(builder, this.version);
        MetadataTransactionBuffer.addType(builder, this.type);
        MetadataTransactionBuffer.addMaxFee(builder, feeVector);
        MetadataTransactionBuffer.addDeadline(builder, deadlineVector);
        MetadataTransactionBuffer.addTargetKey(builder, targetKeyVector);
        MetadataTransactionBuffer.addScopedMetadataKey(builder, scopedMetadataKeyVector);
        MetadataTransactionBuffer.addTargetId(builder, targetIdVector);
        MetadataTransactionBuffer.addValueSizeDelta(builder, this.valueSizeDelta);
        MetadataTransactionBuffer.addValueSize(builder, this.valueSize);    
        MetadataTransactionBuffer.addValue(builder, valueVector);

        const codedTransfer = MetadataTransactionBuffer.endMetadataTransactionBuffer(builder);
        builder.finish(codedTransfer);

        const bytes = builder.asUint8Array();

        return new NamespaceMetadataTransaction(bytes);
    }

    static stringToUint8(stringToConvert: string): Uint8Array{
        return convert.hexToUint8(convert.utf8ToHex(stringToConvert));
    }
}

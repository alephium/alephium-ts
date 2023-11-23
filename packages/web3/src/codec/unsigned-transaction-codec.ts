/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/
import { Parser } from 'binary-parser'
import { UnsignedTx } from '../api/api-alephium'
import { binToHex, hexToBinUnsafe } from '../utils'
import { Script, scriptCodec } from './script-codec'
import { DecodedCompactInt, compactSignedIntCodec, compactUnsignedIntCodec } from './compact-int-codec'
import { Input, InputCodec, inputCodec } from './input-codec'
import { AssetOutput, AssetOutputCodec, assetOutputCodec } from './asset-output-codec'
import { ArrayCodec, DecodedArray } from './array-codec'
import { blakeHash } from './hash'
import { Codec } from './codec'
import { OptionCodec } from './option-codec'

const optionalStatefulScriptCodec = new OptionCodec(scriptCodec)
const inputsCodec = new ArrayCodec(inputCodec)
const outputsCodec = new ArrayCodec(assetOutputCodec)

export interface UnsignedTransaction {
  version: number
  networkId: number
  statefulScript: {
    option: number
    value?: Script
  }
  gasAmount: DecodedCompactInt
  gasPrice: DecodedCompactInt
  inputs: DecodedArray<Input>
  fixedOutputs: DecodedArray<AssetOutput>
}

export class UnsignedTransactionCodec implements Codec<UnsignedTransaction> {
  static parser = new Parser()
    .uint8('version')
    .uint8('networkId')
    .nest('statefulScript', {
      type: optionalStatefulScriptCodec.parser
    })
    .nest('gasAmount', {
      type: compactSignedIntCodec.parser
    })
    .nest('gasPrice', {
      type: compactUnsignedIntCodec.parser
    })
    .nest('inputs', {
      type: inputsCodec.parser
    })
    .nest('fixedOutputs', {
      type: outputsCodec.parser
    })

  parser = UnsignedTransactionCodec.parser

  encode(input: UnsignedTransaction): Buffer {
    return Buffer.concat([
      Buffer.from([input.version, input.networkId]),
      optionalStatefulScriptCodec.encode(input.statefulScript),
      compactSignedIntCodec.encode(input.gasAmount),
      compactUnsignedIntCodec.encode(input.gasPrice),
      inputsCodec.encode(input.inputs.value),
      outputsCodec.encode(input.fixedOutputs.value)
    ])
  }

  decode(input: Buffer): UnsignedTransaction {
    return this.parser.parse(input)
  }

  static decodeToUnsignedTx(rawUnsignedTx: string): UnsignedTx {
    const parsedResult = this.parser.parse(Buffer.from(rawUnsignedTx, 'hex'))
    const txId = binToHex(blakeHash(hexToBinUnsafe(rawUnsignedTx)))
    return UnsignedTransactionCodec.convertToUnsignedTx(parsedResult, txId)
  }

  static convertToUnsignedTx(unsigned: UnsignedTransaction, txId: string): UnsignedTx {
    const txIdBytes = hexToBinUnsafe(txId)

    const version = unsigned.version
    const networkId = unsigned.networkId
    const gasAmount = compactSignedIntCodec.toI32(unsigned.gasAmount)
    const gasPrice = compactUnsignedIntCodec.toU256(unsigned.gasPrice).toString()
    const inputs = InputCodec.convertToAssetInputs(unsigned.inputs.value)
    const fixedOutputs = AssetOutputCodec.convertToFixedAssetOutputs(txIdBytes, unsigned.fixedOutputs.value)
    let scriptOpt: string | undefined = undefined
    if (unsigned.statefulScript.option === 1) {
      scriptOpt = scriptCodec.encode(unsigned.statefulScript.value!).toString('hex')
    }

    return { txId, version, networkId, gasAmount, scriptOpt, gasPrice, inputs, fixedOutputs }
  }

  static encodeUnsignedTx(unsignedTx: UnsignedTx): string {
    const version = unsignedTx.version
    const networkId = unsignedTx.networkId
    const gasAmount = compactSignedIntCodec.decode(compactSignedIntCodec.encodeI32(unsignedTx.gasAmount))
    const gasPrice = compactUnsignedIntCodec.decode(compactUnsignedIntCodec.encodeU256(BigInt(unsignedTx.gasPrice)))
    const inputsValue = InputCodec.convertToInputs(unsignedTx.inputs)
    const inputs = {
      length: compactUnsignedIntCodec.decode(compactUnsignedIntCodec.encodeU32(inputsValue.length)),
      value: inputsValue
    }
    const fixedOutputsValue = AssetOutputCodec.convertToOutputs(unsignedTx.fixedOutputs)
    const fixedOutputs = {
      length: compactUnsignedIntCodec.decode(compactUnsignedIntCodec.encodeU32(fixedOutputsValue.length)),
      value: fixedOutputsValue
    }

    const statefulScript = {
      option: unsignedTx.scriptOpt ? 1 : 0,
      value: unsignedTx.scriptOpt ? scriptCodec.decode(Buffer.from(unsignedTx.scriptOpt, 'hex')) : undefined
    }

    return unsignedTransactionCodec
      .encode({
        version,
        networkId,
        gasAmount,
        gasPrice,
        inputs,
        fixedOutputs,
        statefulScript
      })

      .toString('hex')
  }
}

export const unsignedTransactionCodec = new UnsignedTransactionCodec()
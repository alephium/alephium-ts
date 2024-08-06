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

import { Codec } from './codec'
import { DecodedMethod, methodsCodec, Method, MethodCodec } from './method-codec'
import { OptionCodec } from './option-codec'
import { Reader } from './reader'

export interface DecodedScript {
  methods: DecodedMethod[]
}

export interface Script {
  methods: Method[]
}

export class ScriptCodec extends Codec<DecodedScript> {
  encode(input: DecodedScript): Uint8Array {
    return methodsCodec.encode(input.methods)
  }

  _decode(input: Reader): DecodedScript {
    return { methods: methodsCodec._decode(input) }
  }

  decodeScript(input: Uint8Array): Script {
    const decodedTxScript = this.decode(input)
    const methods = decodedTxScript.methods.map((decodedMethod) => MethodCodec.toMethod(decodedMethod))
    return { methods }
  }

  encodeScript(inputTxScript: Script): Uint8Array {
    const methods = inputTxScript.methods.map((method) => MethodCodec.fromMethod(method))
    return this.encode({ methods })
  }
}

export const scriptCodec = new ScriptCodec()
export const statefulScriptCodecOpt = new OptionCodec(scriptCodec)

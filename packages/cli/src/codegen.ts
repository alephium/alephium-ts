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

import { node, Project, Script, Contract, EventSig, FieldsSig } from '@alephium/web3'
import * as prettier from 'prettier'
import path from 'path'
import fs from 'fs'

const oneAlph = `BigInt('1000000000000000000')`
const header = `/* Autogenerated file. Do not edit manually. */\n/* tslint:disable */\n/* eslint-disable */`

function array(str: string, size: number): string {
  const result = Array(size).fill(str).join(', ')
  return `[${result}]`
}

function parseArrayType(tpe: string): string {
  const ignored = '[;]'
  const tokens: string[] = []
  let acc = ''
  for (let index = 0; index < tpe.length; index++) {
    if (!ignored.includes(tpe.charAt(index))) {
      acc = acc + tpe.charAt(index)
    } else if (acc !== '') {
      tokens.push(acc)
      acc = ''
    }
  }
  const baseTsType = toTsType(tokens[0])
  const sizes = tokens.slice(1).map((str) => parseInt(str))
  return sizes.reduce((acc, size) => array(acc, size), baseTsType)
}

function toTsType(ralphType: string): string {
  switch (ralphType) {
    case 'U256':
    case 'I256':
      return 'bigint'
    case 'Bool':
      return 'boolean'
    case 'Address':
    case 'ByteVec':
      return 'string'
    default: // array type
      return parseArrayType(ralphType)
  }
}

function formatParameters(fieldsSig: node.FieldsSig): string {
  if (fieldsSig.names.length === 0) {
    return ''
  }
  const params = fieldsSig.names.map((name, idx) => `${name}: ${toTsType(fieldsSig.types[`${idx}`])}`).join(', ')
  return `${params}, `
}

function formatToStringArray(strs: string[]): string {
  return `[${strs.map((str) => `'${str}'`).join(', ')}]`
}

function formatToStringObject(strs: string[]): string {
  return `{${strs.map((str) => `${str}: ${str}`)}}`
}

function functionParamsSig(functionSig: node.FunctionSig): FieldsSig {
  return {
    names: functionSig.paramNames,
    types: functionSig.paramTypes,
    isMutable: functionSig.paramIsMutable
  }
}

function genCallFunction(functionSig: node.FunctionSig, funcIndex: number): string {
  if (!functionSig.isPublic || functionSig.returnTypes.length === 0) {
    return ''
  }
  const paramsSig = functionParamsSig(functionSig)
  const extraParams =
    '_extraParams?: {worldStateBlockHash?: string, txId?: string, existingContracts?: string[], inputAssets?: node.TestInputAsset[]}'
  const argNames = formatToStringArray(paramsSig.names)
  const argTypes = formatToStringArray(paramsSig.types)
  const ralphRetTypes = formatToStringArray(functionSig.returnTypes)
  const tsReturnTypes = functionSig.returnTypes.map((tpe) => toTsType(tpe))
  const retType = tsReturnTypes.length === 1 ? `${tsReturnTypes[0]}` : `[${tsReturnTypes.join(', ')}]`
  const args =
    paramsSig.names.length === 0
      ? `[]`
      : `toApiVals(${formatToStringObject(paramsSig.names)}, ${argNames}, ${argTypes})`
  return `
    async ${functionSig.name}Call(${formatParameters(paramsSig)}${extraParams}): Promise<${retType}> {
      const _callResult = await web3.getCurrentNodeProvider().contracts.postContractsCallContract({
        group: this.groupIndex,
        worldStateBlockHash: _extraParams?.worldStateBlockHash,
        txId: _extraParams?.txId,
        address: this.address,
        methodIndex: ${funcIndex},
        args: ${args},
        existingContracts: _extraParams?.existingContracts,
        inputAssets: _extraParams?.inputAssets
      })
      ${
        tsReturnTypes.length === 1
          ? `return fromApiArray(_callResult.returns, ${ralphRetTypes})[0] as ${retType}`
          : `return fromApiArray(_callResult.returns, ${ralphRetTypes}) as ${retType}`
      }
    }
  `
}

function genDeploy(contract: Contract): string {
  const extraParams =
    '_extraParams?: {initialAttoAlphAmount?: bigint, initialTokenAmounts?: Token[], issueTokenAmount?: bigint, gasAmount?: number, gasPrice?: bigint}'
  return `
  static async deploy(signer: SignerProvider, ${formatParameters(contract.fieldsSig)}${extraParams}): Promise<${
    contract.name
  }> {
    const _deployResult = await ${contract.name}.contract.deploy(signer, {
      initialFields: ${formatToStringObject(contract.fieldsSig.names)},
      initialAttoAlphAmount: _extraParams?.initialAttoAlphAmount,
      initialTokenAmounts: _extraParams?.initialTokenAmounts,
      issueTokenAmount: _extraParams?.issueTokenAmount,
      gasAmount: _extraParams?.gasAmount,
      gasPrice: _extraParams?.gasPrice
    })
    return new ${
      contract.name
    }(_deployResult.contractAddress, _deployResult.contractId, _deployResult.fromGroup, _deployResult)
  }
  `
}

function genConnect(contract: Contract): string {
  return `
  static connect(address: string, deployResult?: SignDeployContractTxResult): ${contract.name} {
    const contractId = binToHex(contractIdFromAddress(address))
    const groupIndex = parseInt(contractId.slice(-2))
    return new ${contract.name}(address, contractId, groupIndex, deployResult)
  }
  `
}

function genFetchState(contract: Contract): string {
  const assigns = contract.fieldsSig.names
    .map((name, index) => `${name}: state.fields['${name}'] as ${toTsType(contract.fieldsSig.types[`${index}`])}`)
    .join(', ')
  return `
  async fetchState(): Promise<_${contract.name}State> {
    const state = await ${contract.name}.contract.fetchState(this.address, this.groupIndex)
    return {
      ...state,
      ${assigns}
    }
  }
  `
}

function getEventType(contractName: string, event: EventSig): string {
  return contractName + event.name
}

function genEventType(contractName: string, event: EventSig): string {
  return `
  export interface ${getEventType(contractName, event)} {
    blockHash: string,
    txId: string,
    eventIndex: number,
    ${event.fieldNames.map((name, index) => `${name}: ${toTsType(event.fieldTypes[`${index}`])}`).join(', ')}
  }
  `
}

function genDecodeEvent(contractName: string, event: EventSig, eventIndex: number): string {
  const assigns = event.fieldNames
    .map((name, index) => `${name}: fields['${name}'] as ${toTsType(event.fieldTypes[`${index}`])}`)
    .join(', ')
  return `
    private decode${event.name}(event: node.ContractEvent): ${getEventType(contractName, event)} {
      if (event.eventIndex !== ${eventIndex}) {
        throw new Error('Invalid event index: ' + event.eventIndex + ', expected: ${eventIndex}')
      }
      const fields = fromApiVals(
        event.fields,
        ${formatToStringArray(event.fieldNames)},
        ${formatToStringArray(event.fieldTypes)}
      )
      return {
        blockHash: event.blockHash,
        txId: event.txId,
        eventIndex: event.eventIndex,
        ${assigns}
      }
    }
  `
}

function genSubscribeToEvents(eventType: string): string {
  return `
    const errorCallback = (err: any, subscription: Subscription<node.ContractEvent>): Promise<void> => {
      return options.errorCallback(err, subscription as unknown as Subscription<${eventType}>)
    }
    const opt: SubscribeOptions<node.ContractEvent> = {
      pollingInterval: options.pollingInterval,
      messageCallback: messageCallback,
      errorCallback: errorCallback
    }
    return subscribeToEvents(opt, this.address, fromCount)
  `
}

function genSubscribeEvent(contractName: string, event: EventSig, eventIndex: number): string {
  const eventType = `${contractName}${event.name}`
  return `
    ${genDecodeEvent(contractName, event, eventIndex)}

    subscribe${event.name}(options: SubscribeOptions<${eventType}>, fromCount?: number): EventSubscription {
      const messageCallback = (event: node.ContractEvent): Promise<void> => {
        if (event.eventIndex !== ${eventIndex}) {
          return Promise.resolve()
        }
        return options.messageCallback(this.decode${event.name}(event))
      }
      ${genSubscribeToEvents(eventType)}
    }
  `
}

function genSubscribeAllEvents(contract: Contract): string {
  if (contract.eventsSig.length <= 1) {
    return ''
  }
  const eventTypes = contract.eventsSig.map((e) => getEventType(contract.name, e)).join(' | ')
  const cases = contract.eventsSig
    .map((event, index) => {
      return `
        case ${index}: {
          return options.messageCallback(this.decode${event.name}(event))
        }
      `
    })
    .join('\n')
  return `
    subscribeEvents(options: SubscribeOptions<${eventTypes}>, fromCount?: number): EventSubscription {
      const messageCallback = (event: node.ContractEvent): Promise<void> => {
        switch (event.eventIndex) {
          ${cases}
          default:
            throw new Error('Invalid event index: ' + event.eventIndex)
        }
      }
      ${genSubscribeToEvents(eventTypes)}
    }
  `
}

function genContractState(contract: Contract): string {
  if (contract.fieldsSig.names.length === 0) {
    return `export type _${contract.name}State = Omit<ContractState, 'fields'>`
  }
  return `
    export type _${contract.name}Fields = {
      ${formatParameters(contract.fieldsSig)}
    }

    export type _${contract.name}State = _${contract.name}Fields & Omit<ContractState, 'fields'>
  `
}

function genStateForTest(contract: Contract): string {
  const initialFields = contract.fieldsSig.names.map((name) => `${name}: ${name}`).join(', ')
  return `
    // This is used for testing contract functions
    static stateForTest(${formatParameters(contract.fieldsSig)}asset?: Asset, address?: string): ContractState {
      const newAsset = {
        alphAmount: asset?.alphAmount ?? ${oneAlph},
        tokens: asset?.tokens
      }
      return ${contract.name}.contract.toState({${initialFields}}, newAsset, address)
    }
  `
}

function genTestFunction(contract: Contract, functionSig: node.FunctionSig, index: number): string {
  const funcName = functionSig.name.charAt(0).toUpperCase() + functionSig.name.slice(1)
  const paramsSig = functionParamsSig(functionSig)
  const funcHasArgs = paramsSig.names.length > 0
  const funcArgs = funcHasArgs ? `args: {${formatParameters(paramsSig)}}, ` : ''
  const contractHasFields = contract.fieldsSig.names.length > 0
  const extraParams =
    '_extraParams?: {group?: number, address?: string, initialAsset?: Asset, existingContracts?: ContractState[], inputAssets?: InputAsset[]}'
  const fieldParam = contractHasFields ? `_initFields: _${contract.name}Fields | Fields, ` : ''
  const tsReturnTypes = `[${functionSig.returnTypes.map((tpe) => toTsType(tpe)).join(', ')}]`
  const retType = `Omit<TestContractResult, 'returns'> & { returns: ${tsReturnTypes} }`
  const testFuncName = functionSig.isPublic ? 'testPublicMethod' : 'testPrivateMethod'
  return `
    static async test${funcName}(${funcArgs}${fieldParam}${extraParams}): Promise<${retType}> {
      const _initialAsset = {
        alphAmount: _extraParams?.initialAsset?.alphAmount ?? ${oneAlph},
        tokens: _extraParams?.initialAsset?.tokens
      }
      const _testParams = {
        ..._extraParams,
        testMethodIndex: ${index},
        testArgs: ${funcHasArgs ? 'args' : '{}'},
        initialFields: ${contractHasFields ? '_initFields as Fields' : '{}'},
        initialAsset: _initialAsset,
      }
      const _testResult = await ${contract.name}.contract.${testFuncName}('${functionSig.name}', _testParams)
      return { ..._testResult, returns: _testResult.returns as ${tsReturnTypes} }
    }
  `
}

function genContract(contract: Contract): string {
  const contractJson = contract.toString()
  const optionalImports =
    contract.eventsSig.length === 0
      ? ''
      : 'fromApiVals, subscribeToEvents, SubscribeOptions, Subscription, EventSubscription'
  const source = `
    ${header}

    import {
      web3, Contract, SignerProvider, Address, Token, toApiVals, ContractState,
      node, binToHex, TestContractResult, InputAsset, Asset, Fields,
      SignDeployContractTxResult, contractIdFromAddress, fromApiArray, ${optionalImports}
    } from '@alephium/web3'

    ${contract.eventsSig.map((e) => genEventType(contract.name, e)).join('\n')}
    ${genContractState(contract)}

    export class ${contract.name} {
      readonly static contract: Contract = Contract.fromJson(JSON.parse(\`${contractJson}\`))

      readonly address: Address
      readonly contractId: string
      readonly groupIndex: number
      deployResult: SignDeployContractTxResult | undefined

      private constructor(
        address: Address,
        contractId: string,
        groupIndex: number,
        deployResult?: SignDeployContractTxResult
      ) {
        this.address = address
        this.contractId = contractId
        this.groupIndex = groupIndex
        this.deployResult = deployResult
      }

      ${genDeploy(contract)}
      ${genConnect(contract)}
      ${genFetchState(contract)}
      ${contract.eventsSig.map((e, index) => genSubscribeEvent(contract.name, e, index)).join('\n')}
      ${genSubscribeAllEvents(contract)}
      ${genStateForTest(contract)}
      ${contract.functions.map((f, index) => genTestFunction(contract, f, index)).join('\n')}
      ${contract.functions.map((f, index) => genCallFunction(f, index)).join('\n')}
    }
  `
  return prettier.format(source, { parser: 'typescript' })
}

function genScript(script: Script): string {
  console.log(`Generating code for script ${script.name}`)
  const withAssets = '_extraParams?: {attoAlphAmount?: bigint, tokens?: Token[], gasAmount?: number, gasPrice?: bigint}'
  const withoutAssets = '_extraParams?: {gasAmount?: number, gasPrice?: bigint}'
  const usePreapprovedAssets = script.functions[0].usePreapprovedAssets
  const extraParams = usePreapprovedAssets ? withAssets : withoutAssets
  const scriptJson = script.toString()
  return `
    export class ${script.name} {
      private constructor() {
      }

      static async execute(signer: SignerProvider, ${formatParameters(
        script.fieldsSig
      )}${extraParams}): Promise<SignExecuteScriptTxResult> {
        const script = Script.fromJson(JSON.parse(\`${scriptJson}\`))
        return script.execute(signer, {
          initialFields: ${formatToStringObject(script.fieldsSig.names)},
          ${usePreapprovedAssets ? 'attoAlphAmount: _extraParams?.attoAlphAmount' : ''},
          ${usePreapprovedAssets ? 'tokens: _extraParams?.tokens' : ''},
          gasAmount: _extraParams?.gasAmount,
          gasPrice: _extraParams?.gasPrice
        })
      }
    }
  `
}

function genScripts(scripts: Script[]): string {
  const scriptsSource = scripts.map((s) => genScript(s)).join('\n')
  const source = `
    ${header}

    import {
      Token,
      SignExecuteScriptTxResult,
      Script,
      SignerProvider
    } from '@alephium/web3'

    ${scriptsSource}
  `
  return prettier.format(source, { parser: 'typescript' })
}

export function codegen(outDir: string) {
  const outPath = path.isAbsolute(outDir) ? outDir : path.resolve(outDir)
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath, { recursive: true })
  }

  Array.from(Project.currentProject.contracts.values()).forEach((c) => {
    console.log(`Generating code for contract ${c.artifact.name}`)
    const filename = `${c.artifact.name}.ts`
    const sourcePath = path.join(outPath, filename)
    const sourceCode = genContract(c.artifact)
    fs.writeFileSync(sourcePath, sourceCode, 'utf8')
  })

  const scriptPath = path.join(outPath, 'scripts.ts')
  const scripts = Array.from(Project.currentProject.scripts.values()).map((s) => s.artifact)
  const source = genScripts(scripts)
  fs.writeFileSync(scriptPath, source, 'utf8')
}
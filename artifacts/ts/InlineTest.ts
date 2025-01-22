/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
  Narrow,
} from "@alephium/web3";
import { default as InlineTestContractJson } from "../test/InlineTest.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import {
  AddStruct1,
  AddStruct2,
  Balances,
  MapValue,
  TokenBalance,
  AllStructs,
} from "./types";

// Custom types for the contract
export namespace InlineTestTypes {
  export type Fields = {
    count: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    nextCount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    nextCountWithPay: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    nextCountWithoutPay: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    nextCount: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    nextCountWithPay: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    nextCountWithoutPay: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  InlineTestInstance,
  InlineTestTypes.Fields
> {
  encodeFields(fields: InlineTestTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  at(address: string): InlineTestInstance {
    return new InlineTestInstance(address);
  }

  tests = {
    nextCount: async (
      params: Omit<
        TestContractParamsWithoutMaps<InlineTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "nextCount", params, getContractByCodeHash);
    },
    nextCountWithPay: async (
      params: Omit<
        TestContractParamsWithoutMaps<InlineTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(
        this,
        "nextCountWithPay",
        params,
        getContractByCodeHash
      );
    },
    nextCountWithoutPay: async (
      params: Omit<
        TestContractParamsWithoutMaps<InlineTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(
        this,
        "nextCountWithoutPay",
        params,
        getContractByCodeHash
      );
    },
  };

  stateForTest(
    initFields: InlineTestTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const InlineTest = new Factory(
  Contract.fromJson(
    InlineTestContractJson,
    "=3-1+3=4+40454054=86+000100000109b413c32386f26fc10000a9a0000d2aa100a00002000000000106a0000d2aa100a00002",
    "f8d74ceeaa346ad74b340afb8b1ddf6be2e5a90384561b03f0b7161dd0e45b12",
    AllStructs
  )
);
registerContract(InlineTest);

// Use this class to interact with the blockchain
export class InlineTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<InlineTestTypes.State> {
    return fetchContractState(InlineTest, this);
  }

  view = {
    nextCount: async (
      params?: InlineTestTypes.CallMethodParams<"nextCount">
    ): Promise<InlineTestTypes.CallMethodResult<"nextCount">> => {
      return callMethod(
        InlineTest,
        this,
        "nextCount",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    nextCountWithPay: async (
      params?: InlineTestTypes.CallMethodParams<"nextCountWithPay">
    ): Promise<InlineTestTypes.CallMethodResult<"nextCountWithPay">> => {
      return callMethod(
        InlineTest,
        this,
        "nextCountWithPay",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    nextCountWithoutPay: async (
      params?: InlineTestTypes.CallMethodParams<"nextCountWithoutPay">
    ): Promise<InlineTestTypes.CallMethodResult<"nextCountWithoutPay">> => {
      return callMethod(
        InlineTest,
        this,
        "nextCountWithoutPay",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    nextCount: async (
      params: InlineTestTypes.SignExecuteMethodParams<"nextCount">
    ): Promise<InlineTestTypes.SignExecuteMethodResult<"nextCount">> => {
      return signExecuteMethod(InlineTest, this, "nextCount", params);
    },
    nextCountWithPay: async (
      params: InlineTestTypes.SignExecuteMethodParams<"nextCountWithPay">
    ): Promise<InlineTestTypes.SignExecuteMethodResult<"nextCountWithPay">> => {
      return signExecuteMethod(InlineTest, this, "nextCountWithPay", params);
    },
    nextCountWithoutPay: async (
      params: InlineTestTypes.SignExecuteMethodParams<"nextCountWithoutPay">
    ): Promise<
      InlineTestTypes.SignExecuteMethodResult<"nextCountWithoutPay">
    > => {
      return signExecuteMethod(InlineTest, this, "nextCountWithoutPay", params);
    },
  };

  async multicall<Calls extends InlineTestTypes.MultiCallParams>(
    calls: Calls
  ): Promise<InlineTestTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends InlineTestTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<InlineTestTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | InlineTestTypes.MultiCallParams
      | InlineTestTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      InlineTest,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
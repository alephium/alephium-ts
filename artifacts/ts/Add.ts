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
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
} from "@alephium/web3";
import { default as AddContractJson } from "../add/Add.ral.json";
import { getContractByCodeHash } from "./contracts";
import {
  AddStruct1,
  AddStruct2,
  Balances,
  MapValue,
  TokenBalance,
  AllStructs,
} from "./types";

// Custom types for the contract
export namespace AddTypes {
  export type Fields = {
    sub: HexString;
    result: bigint;
  };

  export type State = ContractState<Fields>;

  export type AddEvent = ContractEvent<{ x: bigint; y: bigint }>;
  export type Add1Event = ContractEvent<{ a: bigint; b: bigint }>;
  export type EmptyEvent = ContractEvent<{}>;

  export interface CallMethodTable {
    add: {
      params: CallContractParams<{ array: [bigint, bigint] }>;
      result: CallContractResult<[bigint, bigint]>;
    };
    add2: {
      params: CallContractParams<{
        array1: [bigint, bigint];
        address: Address;
        array2: [bigint, bigint];
        addS: AddStruct1;
      }>;
      result: CallContractResult<[bigint, bigint]>;
    };
    createSubContract: {
      params: CallContractParams<{
        a: bigint;
        path: HexString;
        subContractId: HexString;
        payer: Address;
      }>;
      result: CallContractResult<null>;
    };
    createSubContractAndTransfer: {
      params: CallContractParams<{
        a: bigint;
        path: HexString;
        subContractId: HexString;
        payer: Address;
      }>;
      result: CallContractResult<null>;
    };
    destroy: {
      params: CallContractParams<{ caller: Address }>;
      result: CallContractResult<null>;
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
  export type MulticallReturnType<Callss extends MultiCallParams[]> =
    Callss["length"] extends 1
      ? MultiCallResults<Callss[0]>
      : { [index in keyof Callss]: MultiCallResults<Callss[index]> };

  export interface SignExecuteMethodTable {
    add: {
      params: SignExecuteContractMethodParams<{ array: [bigint, bigint] }>;
      result: SignExecuteScriptTxResult;
    };
    add2: {
      params: SignExecuteContractMethodParams<{
        array1: [bigint, bigint];
        address: Address;
        array2: [bigint, bigint];
        addS: AddStruct1;
      }>;
      result: SignExecuteScriptTxResult;
    };
    createSubContract: {
      params: SignExecuteContractMethodParams<{
        a: bigint;
        path: HexString;
        subContractId: HexString;
        payer: Address;
      }>;
      result: SignExecuteScriptTxResult;
    };
    createSubContractAndTransfer: {
      params: SignExecuteContractMethodParams<{
        a: bigint;
        path: HexString;
        subContractId: HexString;
        payer: Address;
      }>;
      result: SignExecuteScriptTxResult;
    };
    destroy: {
      params: SignExecuteContractMethodParams<{ caller: Address }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<AddInstance, AddTypes.Fields> {
  encodeFields(fields: AddTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { Add: 0, Add1: 1, Empty: 2 };

  at(address: string): AddInstance {
    return new AddInstance(address);
  }

  tests = {
    add: async (
      params: TestContractParamsWithoutMaps<
        AddTypes.Fields,
        { array: [bigint, bigint] }
      >
    ): Promise<TestContractResultWithoutMaps<[bigint, bigint]>> => {
      return testMethod(this, "add", params, getContractByCodeHash);
    },
    add2: async (
      params: TestContractParamsWithoutMaps<
        AddTypes.Fields,
        {
          array1: [bigint, bigint];
          address: Address;
          array2: [bigint, bigint];
          addS: AddStruct1;
        }
      >
    ): Promise<TestContractResultWithoutMaps<[bigint, bigint]>> => {
      return testMethod(this, "add2", params, getContractByCodeHash);
    },
    addPrivate: async (
      params: TestContractParamsWithoutMaps<
        AddTypes.Fields,
        { array: [bigint, bigint] }
      >
    ): Promise<TestContractResultWithoutMaps<[bigint, bigint]>> => {
      return testMethod(this, "addPrivate", params, getContractByCodeHash);
    },
    createSubContract: async (
      params: TestContractParamsWithoutMaps<
        AddTypes.Fields,
        { a: bigint; path: HexString; subContractId: HexString; payer: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "createSubContract",
        params,
        getContractByCodeHash
      );
    },
    createSubContractAndTransfer: async (
      params: TestContractParamsWithoutMaps<
        AddTypes.Fields,
        { a: bigint; path: HexString; subContractId: HexString; payer: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "createSubContractAndTransfer",
        params,
        getContractByCodeHash
      );
    },
    destroy: async (
      params: TestContractParamsWithoutMaps<
        AddTypes.Fields,
        { caller: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "destroy", params, getContractByCodeHash);
    },
  };
}

// Use this object to test and deploy the contract
export const Add = new Factory(
  Contract.fromJson(
    AddContractJson,
    "=12-2+5c=2-2+81=3-1+e=2-2+bc=83-1+97e010a61646450726976617465=266",
    "c46db1ae7bae8b332c115869126eb1402bc71574925608a2adcea3cf7b9f8e7e",
    AllStructs
  )
);

// Use this class to interact with the blockchain
export class AddInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<AddTypes.State> {
    return fetchContractState(Add, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeAddEvent(
    options: EventSubscribeOptions<AddTypes.AddEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Add.contract,
      this,
      options,
      "Add",
      fromCount
    );
  }

  subscribeAdd1Event(
    options: EventSubscribeOptions<AddTypes.Add1Event>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Add.contract,
      this,
      options,
      "Add1",
      fromCount
    );
  }

  subscribeEmptyEvent(
    options: EventSubscribeOptions<AddTypes.EmptyEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Add.contract,
      this,
      options,
      "Empty",
      fromCount
    );
  }

  subscribeAllEvents(
    options: EventSubscribeOptions<
      AddTypes.AddEvent | AddTypes.Add1Event | AddTypes.EmptyEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(Add.contract, this, options, fromCount);
  }

  view = {
    add: async (
      params: AddTypes.CallMethodParams<"add">
    ): Promise<AddTypes.CallMethodResult<"add">> => {
      return callMethod(Add, this, "add", params, getContractByCodeHash);
    },
    add2: async (
      params: AddTypes.CallMethodParams<"add2">
    ): Promise<AddTypes.CallMethodResult<"add2">> => {
      return callMethod(Add, this, "add2", params, getContractByCodeHash);
    },
    createSubContract: async (
      params: AddTypes.CallMethodParams<"createSubContract">
    ): Promise<AddTypes.CallMethodResult<"createSubContract">> => {
      return callMethod(
        Add,
        this,
        "createSubContract",
        params,
        getContractByCodeHash
      );
    },
    createSubContractAndTransfer: async (
      params: AddTypes.CallMethodParams<"createSubContractAndTransfer">
    ): Promise<AddTypes.CallMethodResult<"createSubContractAndTransfer">> => {
      return callMethod(
        Add,
        this,
        "createSubContractAndTransfer",
        params,
        getContractByCodeHash
      );
    },
    destroy: async (
      params: AddTypes.CallMethodParams<"destroy">
    ): Promise<AddTypes.CallMethodResult<"destroy">> => {
      return callMethod(Add, this, "destroy", params, getContractByCodeHash);
    },
  };

  transact = {
    add: async (
      params: AddTypes.SignExecuteMethodParams<"add">
    ): Promise<AddTypes.SignExecuteMethodResult<"add">> => {
      return signExecuteMethod(Add, this, "add", params);
    },
    add2: async (
      params: AddTypes.SignExecuteMethodParams<"add2">
    ): Promise<AddTypes.SignExecuteMethodResult<"add2">> => {
      return signExecuteMethod(Add, this, "add2", params);
    },
    createSubContract: async (
      params: AddTypes.SignExecuteMethodParams<"createSubContract">
    ): Promise<AddTypes.SignExecuteMethodResult<"createSubContract">> => {
      return signExecuteMethod(Add, this, "createSubContract", params);
    },
    createSubContractAndTransfer: async (
      params: AddTypes.SignExecuteMethodParams<"createSubContractAndTransfer">
    ): Promise<
      AddTypes.SignExecuteMethodResult<"createSubContractAndTransfer">
    > => {
      return signExecuteMethod(
        Add,
        this,
        "createSubContractAndTransfer",
        params
      );
    },
    destroy: async (
      params: AddTypes.SignExecuteMethodParams<"destroy">
    ): Promise<AddTypes.SignExecuteMethodResult<"destroy">> => {
      return signExecuteMethod(Add, this, "destroy", params);
    },
  };

  async multicall<Callss extends AddTypes.MultiCallParams[]>(
    ...callss: Callss
  ): Promise<AddTypes.MulticallReturnType<Callss>> {
    return (await multicallMethods(
      Add,
      this,
      callss,
      getContractByCodeHash
    )) as AddTypes.MulticallReturnType<Callss>;
  }
}

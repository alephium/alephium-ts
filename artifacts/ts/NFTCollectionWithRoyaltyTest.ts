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
import { default as NFTCollectionWithRoyaltyTestContractJson } from "../nft/NFTCollectionWithRoyaltyTest.ral.json";
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
export namespace NFTCollectionWithRoyaltyTestTypes {
  export type Fields = {
    nftTemplateId: HexString;
    collectionUri: HexString;
    collectionOwner: Address;
    royaltyRate: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getCollectionUri: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    totalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    nftByIndex: {
      params: CallContractParams<{ index: bigint }>;
      result: CallContractResult<HexString>;
    };
    validateNFT: {
      params: CallContractParams<{ nftId: HexString; nftIndex: bigint }>;
      result: CallContractResult<null>;
    };
    royaltyAmount: {
      params: CallContractParams<{ tokenId: HexString; salePrice: bigint }>;
      result: CallContractResult<bigint>;
    };
    payRoyalty: {
      params: CallContractParams<{ payer: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    withdrawRoyalty: {
      params: CallContractParams<{ recipient: Address; amount: bigint }>;
      result: CallContractResult<null>;
    };
    mint: {
      params: CallContractParams<{ nftUri: HexString }>;
      result: CallContractResult<HexString>;
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
    getCollectionUri: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    totalSupply: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    nftByIndex: {
      params: SignExecuteContractMethodParams<{ index: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    validateNFT: {
      params: SignExecuteContractMethodParams<{
        nftId: HexString;
        nftIndex: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    royaltyAmount: {
      params: SignExecuteContractMethodParams<{
        tokenId: HexString;
        salePrice: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    payRoyalty: {
      params: SignExecuteContractMethodParams<{
        payer: Address;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    withdrawRoyalty: {
      params: SignExecuteContractMethodParams<{
        recipient: Address;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
    mint: {
      params: SignExecuteContractMethodParams<{ nftUri: HexString }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  NFTCollectionWithRoyaltyTestInstance,
  NFTCollectionWithRoyaltyTestTypes.Fields
> {
  encodeFields(fields: NFTCollectionWithRoyaltyTestTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  at(address: string): NFTCollectionWithRoyaltyTestInstance {
    return new NFTCollectionWithRoyaltyTestInstance(address);
  }

  tests = {
    getCollectionUri: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          NFTCollectionWithRoyaltyTestTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(
        this,
        "getCollectionUri",
        params,
        getContractByCodeHash
      );
    },
    totalSupply: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          NFTCollectionWithRoyaltyTestTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "totalSupply", params, getContractByCodeHash);
    },
    nftByIndex: async (
      params: TestContractParamsWithoutMaps<
        NFTCollectionWithRoyaltyTestTypes.Fields,
        { index: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "nftByIndex", params, getContractByCodeHash);
    },
    validateNFT: async (
      params: TestContractParamsWithoutMaps<
        NFTCollectionWithRoyaltyTestTypes.Fields,
        { nftId: HexString; nftIndex: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "validateNFT", params, getContractByCodeHash);
    },
    royaltyAmount: async (
      params: TestContractParamsWithoutMaps<
        NFTCollectionWithRoyaltyTestTypes.Fields,
        { tokenId: HexString; salePrice: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "royaltyAmount", params, getContractByCodeHash);
    },
    payRoyalty: async (
      params: TestContractParamsWithoutMaps<
        NFTCollectionWithRoyaltyTestTypes.Fields,
        { payer: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "payRoyalty", params, getContractByCodeHash);
    },
    withdrawRoyalty: async (
      params: TestContractParamsWithoutMaps<
        NFTCollectionWithRoyaltyTestTypes.Fields,
        { recipient: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "withdrawRoyalty", params, getContractByCodeHash);
    },
    mint: async (
      params: TestContractParamsWithoutMaps<
        NFTCollectionWithRoyaltyTestTypes.Fields,
        { nftUri: HexString }
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "mint", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: NFTCollectionWithRoyaltyTestTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const NFTCollectionWithRoyaltyTest = new Factory(
  Contract.fromJson(
    NFTCollectionWithRoyaltyTestContractJson,
    "",
    "3b64d5e360566a4e4f568f773536a3ea74e66d12231aa44f19d2214ba87b38d6",
    AllStructs
  )
);

// Use this class to interact with the blockchain
export class NFTCollectionWithRoyaltyTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<NFTCollectionWithRoyaltyTestTypes.State> {
    return fetchContractState(NFTCollectionWithRoyaltyTest, this);
  }

  view = {
    getCollectionUri: async (
      params?: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"getCollectionUri">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"getCollectionUri">
    > => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "getCollectionUri",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    totalSupply: async (
      params?: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"totalSupply">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"totalSupply">
    > => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "totalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    nftByIndex: async (
      params: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"nftByIndex">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"nftByIndex">
    > => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "nftByIndex",
        params,
        getContractByCodeHash
      );
    },
    validateNFT: async (
      params: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"validateNFT">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"validateNFT">
    > => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "validateNFT",
        params,
        getContractByCodeHash
      );
    },
    royaltyAmount: async (
      params: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"royaltyAmount">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"royaltyAmount">
    > => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "royaltyAmount",
        params,
        getContractByCodeHash
      );
    },
    payRoyalty: async (
      params: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"payRoyalty">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"payRoyalty">
    > => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "payRoyalty",
        params,
        getContractByCodeHash
      );
    },
    withdrawRoyalty: async (
      params: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"withdrawRoyalty">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"withdrawRoyalty">
    > => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "withdrawRoyalty",
        params,
        getContractByCodeHash
      );
    },
    mint: async (
      params: NFTCollectionWithRoyaltyTestTypes.CallMethodParams<"mint">
    ): Promise<NFTCollectionWithRoyaltyTestTypes.CallMethodResult<"mint">> => {
      return callMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "mint",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getCollectionUri: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"getCollectionUri">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"getCollectionUri">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "getCollectionUri",
        params
      );
    },
    totalSupply: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"totalSupply">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"totalSupply">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "totalSupply",
        params
      );
    },
    nftByIndex: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"nftByIndex">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"nftByIndex">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "nftByIndex",
        params
      );
    },
    validateNFT: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"validateNFT">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"validateNFT">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "validateNFT",
        params
      );
    },
    royaltyAmount: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"royaltyAmount">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"royaltyAmount">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "royaltyAmount",
        params
      );
    },
    payRoyalty: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"payRoyalty">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"payRoyalty">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "payRoyalty",
        params
      );
    },
    withdrawRoyalty: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"withdrawRoyalty">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"withdrawRoyalty">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "withdrawRoyalty",
        params
      );
    },
    mint: async (
      params: NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodParams<"mint">
    ): Promise<
      NFTCollectionWithRoyaltyTestTypes.SignExecuteMethodResult<"mint">
    > => {
      return signExecuteMethod(
        NFTCollectionWithRoyaltyTest,
        this,
        "mint",
        params
      );
    },
  };

  async multicall<
    Calls extends NFTCollectionWithRoyaltyTestTypes.MultiCallParams
  >(
    calls: Calls
  ): Promise<NFTCollectionWithRoyaltyTestTypes.MultiCallResults<Calls>>;
  async multicall<
    Callss extends NFTCollectionWithRoyaltyTestTypes.MultiCallParams[]
  >(
    callss: Narrow<Callss>
  ): Promise<NFTCollectionWithRoyaltyTestTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | NFTCollectionWithRoyaltyTestTypes.MultiCallParams
      | NFTCollectionWithRoyaltyTestTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      NFTCollectionWithRoyaltyTest,
      this,
      callss,
      getContractByCodeHash
    );
  }
}

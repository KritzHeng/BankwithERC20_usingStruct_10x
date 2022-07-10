import React  from 'react'
import * as ethers from "ethers";
// import * as web3 from "web3";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
} from "../services/wallet-service";
import {
  getNetworkCurrency,
  getNetworkName,
  //   getNetworkTokens,
} from "../constants/network-id";
import { formatEther, formatUnits } from "ethers/lib/utils";

import abi_token from "../ABI_CONTRACT/ABI_TOKEN.json";
import abi_bank from "../ABI_CONTRACT/ABI_BANK.json";

import Link from "next/link";

const createAccount = () => {

    const [address, setAddress] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [inputAccountName, setInputAccountName] = useState<string | null>("");
  
    const [addr_Token, setAddr_Token] = useState(
      "0xf9a375284900494e747323eA714E6BDfCe83315D"
    );
    const [addr_bank, setAddr_Bank] = useState(
      "0x7428Bb0ad1f1D9A035AebC7137299FbdD53b0A56"
    );
    const [symbol, setSymbol] = useState(
      "0x4441490000000000000000000000000000000000000000000000000000000000"
    );

    const createAccount = async (
        // _accountName : string
    )=> {


        const provider = getProvider()!;
        const signer = provider.getSigner();
        const contract = new ethers.Contract(addr_bank, abi_bank, signer);
        const txResponse = await contract.addAccount(inputAccountName, {gasPrice: 300000,
        gasLimit: 9000000});
        await txResponse.wait();
        console.log("1")
        loadAccountData();
        setStatus("Done!!!");

    }


    const loadAccountData = async () => {
    
        const addr = getWalletAddress();
        setAddress(addr);
        const chainId = await getChainId();
        setNetwork(chainId);
  

        setStatus(null);
    
      };
    

      useEffect(() => {
        loadAccountData();
    
        const handleAccountChange = (addresses: string[]) => {
          setAddress(addresses[0]);
          loadAccountData();
        };
    
        const handleNetworkChange = (networkId: string) => {
          setNetwork(networkId);
          loadAccountData();
        };
    
        getEthereum()?.on("accountsChanged", handleAccountChange);
    
        getEthereum()?.on("chainChanged", handleNetworkChange);
      }, []);


  return (
    <div className="bg-[#f8f8f8]">
    <div>
      <div className="bg-[#ffffff]  p-3 ">
        {/* <img className="font-serif text-4xl italic font-normal text-back-700 " src="../public/fin-logo.png"/> */}
        <div className="font-bold text-4xl font-normal text-back-700 ">
        <a href="/">🚀10XBank</a>
        </div>

        {address ? (
          <div className="p-2 font-serif text-back text-back-70  absolute top-3 right-6">
            {address}
          </div>
        ) : (
          <button
            className="p-2 font-serif text-back  outline outline-offset-1 text-back-700  outline-[#32363D]   drop-shadow-xl absolute top-3 right-6 transition ease-in-out delay-150 bg-[#ffffff] hover:-translate-y-1 hover:scale-110 hover:bg-[#cda0fc] duration-300"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {address ? (
        <div className="  ">
          <div className=" py-8 ">
            <div className=" py-8 px-24 text-flex text-back text-xl text-back-700">
              Create Your bank account:
            </div>
        <div>
        <div className="px-20">
                          <div className=" border grid justify-items-center">
                            <div className="">
                              <div className="flex py-2">
                                <h1>Acount Name:</h1>
                                <input value={inputAccountName}
        onChange={(e) => setInputAccountName(e.target.value)} placeholder='Account Name'/>
                                {/* <input placeholder='Account Name' onChange={}></input> */}
                                {/* <h1 className="px-9">{item.name}</h1> */}
                              </div>
                              <div className="flex py-2">
                                <h1></h1>
  
                                <button onClick={(createAccount)}>Create</button>
                                <h1 className="px-20">{status}</h1>
                              </div>
                            </div>
                          </div>
                        </div>


        </div>


          </div>
        </div>
      ) : (
        <div className="  ">
          <div className=" py-8 ">
          <h1>Connect Wallet ...</h1>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default createAccount
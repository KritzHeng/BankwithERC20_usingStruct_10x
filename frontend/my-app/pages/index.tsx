import type { NextPage } from "next";
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
// import { Token } from "../types/token.type";
// import Metamask from './Metamask';
// import axios from "axios";
import abi_token from "../ABI_CONTRACT/ABI_TOKEN.json";
import abi_bank from "../ABI_CONTRACT/ABI_BANK.json";

const Home: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  //   const [balance, setBalance] = useState<string | null>(null);

  const [nameToken, setNameToken] = useState<string | null>(null);
  const [maxSupply, setMaxSupply] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [currentSupply, setCurrentSupply] = useState<string | null>(null);
  const [val, setVal] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const [dataAll, setDataAll] = useState<string[] | null>([]);

  const [addr_Token, setAddr_Token] = useState(
    "0xf9a375284900494e747323eA714E6BDfCe83315D"
  );
  const [addr_bank, setAddr_Bank] = useState(
    "0x7428Bb0ad1f1D9A035AebC7137299FbdD53b0A56"
  );
  const [symbol, setSymbol] = useState(
    "0x4441490000000000000000000000000000000000000000000000000000000000"
  );

  const getTokenBalance = async (
    tokenAddress: string,
    ownerAddress: string
  ) => {
    const contract = new ethers.Contract(
      tokenAddress,
      abi_token,
      getProvider()!
    );
    console.log(parseInt(await contract.balanceOf(ownerAddress)))
    return parseInt(await contract.balanceOf(ownerAddress));
  };
  const getNameToken = async () => {
    const contract = new ethers.Contract(addr_Token, abi_token, getProvider()!);
    return contract.name();
  };
  const getCountAccount = async (_addr: string) => {
    const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
    const count = await contract.getCountDataAccount(_addr);
    // const str_value = value.toString(16);

    console.log(parseInt(count.toHexString(), 16))

  };
  const getData = async (_addr: string, _x: number) => {
    const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
    const data = await contract.getData(_addr, _x);
    // const str_value = value.toString(16);

    console.log(parseInt(data[1].toHexString(), 16))
    console.log(data[2])
    // const str_value = data.toHexString();
    // return parseInt(str_value, 16);
  };
  //   function getName(address _addr, uint _x)public view returns(string memory){
  //     return myAccounts[_addr].items[_x].accountName;
  // }
  // function getValue(address _addr, uint _x)public view returns(uint){
  //     return myAccounts[_addr].items[_x].itemValue;
  // }
  const getValueDeposits = async (_addr: string, _x: number) => {
    const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
    const value = await contract.getValue(_addr, _x);
    // const str_value = value.toString(16);
    const str_value = value.toHexString();
    return parseInt(str_value, 16);
  };
  const getNameDeposits = async (_addr: string, _x: number) => {
    const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
    const nameDe = await contract.getName(_addr, _x);
    // const str_name = nameDe.toHexString();
    return nameDe;
  };
  // const totalAccounts = async () => {
  //   const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
  //   return contract.name();
  // };

  // const getCurrentSupply = async () => {

  //       const contract = new ethers.Contract(addr_Token, abi_token, getProvider()!);
  //       return contract.supply();
  // }

  // const handlerPublicMint = async () =>{
  //   const addr = getWalletAddress();
  //   setAddress(addr);
  //   const chainId = await getChainId();
  //   setNetwork(chainId);

  //   const tokenBalance = await getTokenBalance(addr_contract, addr).then((res) =>
  //   formatUnits(res, 0)
  //   )
  //   console.log(tokenBalance)

  //     const provider = getProvider()!;
  //     const signer = provider.getSigner();
  //     if(Number(tokenBalance) + 1 > 2){
  //       setStatus("you already have 2 Tickets. ");

  //     }
  //     else{

  //       // const options = {value: ethers.utils.parseEther("0.01")}
  //       const contract = new ethers.Contract(addr_contract, abi_contract, signer);

  //       const txResponse = await contract.publicMint(1, {value: ethers.utils.parseEther("0.01"), gasPrice: 300000,
  //       gasLimit: 9000000});

  //       // try{
  //         await txResponse.wait();
  //         loadAccountData();
  //         setStatus("complete")

  //       // } catch(error){
  //       //   if (error.code === Logger.errors.TRANSACTION_REPLACED) {
  //       //     if (error.cancelled) {
  //       //       // The transaction was replaced  :'(
  //       //       myProcessCancelledTransaction(tx, error.replacement);
  //       //     } else {
  //       //       // The user used "speed up" or something similar
  //       //       // in their client, but we now have the updated info
  //       //       myProcessMinedTransaction(error.replacement, error.receipt);
  //       //     }
  //       //   }
  //       // }
  //       //   {
  //         //     gasPrice: 100,
  //         //     gasLimit: 9000000
  //         // }

  //       }

  // }
  const loadAccountData = async () => {
    // try{

    const addr = getWalletAddress();
    setAddress(addr);
    const chainId = await getChainId();
    setNetwork(chainId);

    const name = await getNameToken();
    setNameToken(name);
    console.log(name);

    setStatus(null);

    // const depoVal = await getValueDeposits(
    //   "0x55F8d65D76356015F342Ea2ddBC05f2F4961d124",
    //   1
    // );
    // console.log("depoVal: ", depoVal);
    // setVal(depoVal);

    // const depoName = await getNameDeposits(
    //   "0x55F8d65D76356015F342Ea2ddBC05f2F4961d124",
    //   1
    // );
    // console.log("depoVal: ", depoName);
    // setName(depoName);


      // const tokenBalance = await getTokenBalance("0xf9a375284900494e747323eA714E6BDfCe83315D","0x55F8d65D76356015F342Ea2ddBC05f2F4961d124");
      const totalData = await getCountAccount("0x55F8d65D76356015F342Ea2ddBC05f2F4961d124");



      const dataall = await getData("0x55F8d65D76356015F342Ea2ddBC05f2F4961d124",1);


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
            🚀10XBank
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
                MyAccounts:
              </div>
              <div>
                <h1>{name}</h1>
                <h1>{val}</h1>
                <h1>aaaaaa</h1>
                <h1>aaaaaa</h1>
                <h1>aaaaaa</h1>
                <h1>aaaaaa</h1>
                <h1>aaaaaa</h1>
                <h1>aaaaaa</h1>
                <h1>aaaaaa</h1>
              </div>

              {/* create */}
              <div></div>
              {/* <div className=" py-8 text-center font-serif text-back text-2xl  text-back-700">
          {currentSupply}/{maxSupply}
          </div> */}

              <div className="flex justify-center my-12'">
                {/* <button
                className="p-2 font-serif text-back  outline outline-offset-1 text-back-700  outline-[#32363D]    drop-shadow-x transition ease-in-out delay-150 bg-[#2759ff] hover:-translate-y-1 hover:scale-110 hover:bg-[#7972cb]"
                onClick={handlerPublicMint}
              >
                MINT
              </button> */}
              </div>
              <h1 className="text-center text-red-700">{status}</h1>
            </div>
          </div>
        ) : (
          <div className="  ">
            <div className=" py-8 ">
              <h1>asfasfasfas</h1>
              <h1>asfasfasfas</h1>
              <h1>asfasfasfas</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

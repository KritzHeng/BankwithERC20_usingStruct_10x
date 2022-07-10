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
import abi_token from "../ABI_CONTRACT/ABI_TOKEN.json";
import abi_bank from "../ABI_CONTRACT/ABI_BANK.json";


const Home: NextPage = () => {

  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  //   const [balance, setBalance] = useState<string | null>(null);

  const [nameToken, setNameToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [dataList, setDataList] = useState([{}]);

  const [addr_Token, setAddr_Token] = useState(
    "0xf9a375284900494e747323eA714E6BDfCe83315D"
  );
  const [addr_bank, setAddr_Bank] = useState(
    "0x7428Bb0ad1f1D9A035AebC7137299FbdD53b0A56"
  );
  const [symbol, setSymbol] = useState(
    "0x4441490000000000000000000000000000000000000000000000000000000000"
  );

  // const getTokenBalance = async (
  //   tokenAddress: string,
  //   ownerAddress: string
  // ) => {
  //   const contract = new ethers.Contract(
  //     tokenAddress,
  //     abi_token,
  //     getProvider()!
  //   );
  //   return parseInt(await contract.balanceOf(ownerAddress));
  // };
  const getNameToken = async () => {
    const contract = new ethers.Contract(addr_Token, abi_token, getProvider()!);
    return contract.name();
  };
  const getCountAccount = async (_addr: string) => {
    const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
    const count = await contract.getCountDataAccount(_addr);
    // const str_value = value.toString(16);

    // console.log(parseInt(count.toHexString(), 16))
    return parseInt(count.toHexString(), 16);
  };
  const getData = async (_addr: string, _x: number) => {
    const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
    const data = await contract.getData(_addr, _x);
    // const str_value = value.toString(16);

    // console.log(parseInt(data[1].toHexString(), 16))
    // console.log(data[2])
    // const str_value = data.toHexString();
    return data;
  };
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

  const depoitSumit = async (amount: number, _x: number, symbol: string) => {
    const contract = new ethers.Contract(addr_bank, abi_bank, getProvider()!);
    const depoit = await contract.depositToken(amount, _x, symbol);
  };

  const loadAccountData = async () => {
 

    const addr = await getWalletAddress();
    setAddress(addr);
    const chainId = await getChainId();
    setNetwork(chainId);

    const name = await getNameToken();
    setNameToken(name);
    setStatus(null);

    const a = [];
    const totalData = await getCountAccount(addr);

    for (let i = 1; i <= Number(totalData); i++) {
      const dataall = await getData(addr, i);
      const listob = {
        name: dataall[2],
        amount: parseInt(dataall[1].toHexString(), 16),
      };
      a.push(listob);
    }
    setDataList(a);
    console.log(dataList);
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
                MyAccounts:
              </div>
              {dataList.length > 0 ? (
                <div>
                  {dataList.map((item, index) => {
                    return (
                      <div key={index} className="py-2">
                        <div className="px-20">
                          <div className=" border grid justify-items-center">
                            <div className="">
                              <div className="flex py-2">
                                <h1>Acount Name:</h1>
                                <h1 className="px-9">{item.name}</h1>
                              </div>
                              <div className="flex py-2">
                                <h1>Balance:</h1>
                                <h1 className="px-20">{item.amount}</h1>
                              </div>
                            </div>
                            <div className="flex ">
                              <button className="border px-20">Deposit</button>
                              <button className="border px-20">Withdraw</button>
                              <button className="border px-20">Transfer</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="px-20">
                    <div className=" border grid justify-items-center">
                      <div className="">
                        <div className="flex py-2">
                          <h1> </h1>
                          <h1 className="px-9"> </h1>
                        </div>
                        <div className="flex py-2">
                          <h1> </h1>
                          <h1 className="px-20"> </h1>
                        </div>
                      </div>
                      <div className="flex py-20">
                        <a href="/createAccount" className="px-20">
                          + Create Bank Account
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <h1>No Account</h1>
                <div className=" border grid justify-items-center">
                  <div className="">
                    <div className="flex py-2">
                      <h1> </h1>
                      <h1 className="px-9"> </h1>
                    </div>
                    <div className="flex py-2">
                      <h1> </h1>
                      <h1 className="px-20"> </h1>
                    </div>
                  </div>
                  <div className="flex py-20">
                    <a href="/createAccount" className="px-20">
                      + Create Bank Account
                    </a>
                  </div>
                </div>
              )}

              <div></div>
              <div className="flex justify-center my-12'"></div>
              <h1 className="text-center text-red-700">{status}</h1>
            </div>
          </div>
        ) : (
          <div className="  ">
            <div className="flex justify-center py-8 ">
              <h1>Connect Wallet ...</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

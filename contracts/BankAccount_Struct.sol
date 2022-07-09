// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BankAccount_Struct is Ownable {
    IERC20 public token;

    constructor(){
    }
   
    struct Account {
        uint itemId;
        uint itemValue;
        string accountName;
    }

    struct MyAccount {
        mapping(uint => Account) items;
        uint overlayingId;
        uint itemsCount;
    }
    mapping(address => MyAccount) public myAccounts;
    mapping(bytes32 => address) public whitelistedTokens;


    
    function addAccount(string memory _accountName) external {
        MyAccount storage overlay = myAccounts[msg.sender];
        overlay.itemsCount ++;
        overlay.items[overlay.itemsCount] = Account(overlay.itemsCount, 0, _accountName);
    }

    function whitelistToken(bytes32 symbol, address tokenAddress) external onlyOwner{
        whitelistedTokens[symbol] = tokenAddress;
    }

    function depositToken(uint256 amount, uint _x, bytes32 symbol) external {
        myAccounts[msg.sender].items[_x].itemValue += amount;
        ERC20(whitelistedTokens[symbol]).transferFrom(msg.sender, address(this), amount);
    }

    function withdrawToken(uint256 amount, uint _x, bytes32 symbol) external {
        myAccounts[msg.sender].items[_x].itemValue -= amount;
        ERC20(whitelistedTokens[symbol]).transfer(msg.sender, amount);
    }



    function getData(address _addr, uint _x) public view returns(Account memory) {
        return myAccounts[_addr].items[_x];
    }
    function getName(address _addr, uint _x)public view returns(string memory){
        return myAccounts[_addr].items[_x].accountName;
    }
    function getValue(address _addr, uint _x)public view returns(uint){
        return myAccounts[_addr].items[_x].itemValue;
    }

    function getCountDataAccount(address _addr)public view returns(uint){
        return myAccounts[_addr].itemsCount;
    }
}  

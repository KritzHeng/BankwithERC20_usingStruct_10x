// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Token is ERC20, Ownable  {
    constructor() ERC20("Dai", "DAI") {}
    function mint(address _to,uint _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}  

 
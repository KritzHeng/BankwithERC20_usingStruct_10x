// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; 

contract KUBCS is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private supply;

    uint256 public maxSupply = 20;

    string public uriPrefix = "";
    string public uriSuffix = ".json";

    bool public paused = true;

    constructor() ERC721("KUBCS Genesis Pass", "KUBCS") {}

    function seturiPrefix(string memory _uriPrefix) public onlyOwner{
        uriPrefix = _uriPrefix;
    }

    function seturiSuffix(string memory _uriSuffix) public onlyOwner{
        uriSuffix = _uriSuffix;
    }

    function _mintloop(address[] calldata _whitelist) public onlyOwner {
        require(!paused, "The contract is paused!");
        require(supply.current() + _whitelist.length <= maxSupply, "Max supply exceeded!");

        for (uint i = 0; i < _whitelist.length; i++) {
            supply.increment();
            uint256 newItemId = supply.current();
            _safeMint(_whitelist[i], newItemId);
            _setTokenURI(newItemId, string(abi.encodePacked(uriPrefix, Strings.toString(newItemId), uriSuffix) ) );
        }
    }

    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

}
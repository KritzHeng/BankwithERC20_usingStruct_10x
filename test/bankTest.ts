import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BankAccountStruct } from "../typechain/BankAccountStruct";
import { Token } from "../typechain/Token";
require('@openzeppelin/hardhat-upgrades');

describe("BankAccount", function () {

	let BankAccount_Struct: BankAccountStruct;
    let Token: Token;
	let owner: SignerWithAddress;
	let wallet1: SignerWithAddress;
	let wallet2: SignerWithAddress
	let addrs: SignerWithAddress[];

	// beforeEach(async function () {

	// 	[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

	// 	const linkTokenFactory = (await ethers.getContractFactory(
	// 		"LinkToken", owner
	// 	)) as LinkToken__factory;
	// 	const totalSupply = (10 ** 9).toString()
	// 	linkToken = await linkTokenFactory.deploy(
	// 		ethers.utils.parseEther(totalSupply),
	// 	)

	// });
    let bank: any;
    let token: any;
    let DAI: any;

  beforeEach(async function () {
    [owner, wallet1, wallet2] = await ethers.getSigners();


    const BankAccount_Struct = await ethers.getContractFactory('BankAccount_Struct', owner)as any;
    const Token = await ethers.getContractFactory('Token', owner)as any;
    bank = await BankAccount_Struct.deploy();
    token = await Token.deploy();

    token.connect(wallet1).transfer(wallet2.address, 1000);

    await token.connect(owner).mint(
        wallet1.address,
        4000
    );
    await token.connect(wallet1).approve(
        bank.address,
        4000
        );
    await token.connect(owner).mint(
        wallet2.address,
        1000
    );
    await token.connect(wallet2).approve(
        bank.address,
        1000
    );

    DAI = ethers.utils.formatBytes32String('DAI');
    await bank.whitelistToken(
      DAI,
      token.address
    );

    await bank.connect(wallet1).addAccount("Jonh");
    // await bank.addAccount("Jonh");
    await bank.connect(wallet2).addAccount("Jazz");




  });


  describe('deployment', function () {
    it('should mint tokens to wallet 1', async function () {
        // console.log(await token.balanceOf(wallet1.address))
        expect(await token.balanceOf(wallet1.address)).to.equal(4000);
    })
    
    it('should transfer tokens to wallet 2', async function () {
        // console.log(await token.balanceOf(wallet2.address))
      expect(await token.balanceOf(wallet2.address)).to.equal(1000);
    })

    it('should whitelist token on the contract', async function () {
      expect(
        await bank.whitelistedTokens(DAI)
      ).to.equal(token.address);
    })
  })

  describe('depositTokens', function () {
    it('should deposit dai', async function () {
        
      
      
      await bank.connect(wallet1).depositTokens(
          100,
          1,
          DAI,
          );

      await bank.connect(wallet2).depositTokens(
        50,
        1,
        DAI,
      );

      expect(await token.balanceOf(wallet1.address)).to.equal(3900);
      expect(await token.balanceOf(wallet2.address)).to.equal(950);

    //   expect(
    //     await bank.accountBalances(wallet1.address, DAI)
    //   ).to.equal(100);
    //   expect(
    //     await bank.accountBalances(wallet2.address, DAI)
    //   ).to.equal(50);
    });
  })

  describe('withdraw', function () {
    it('should withdraw wbtc from the contract', async function () {
      await bank.connect(wallet1).depositTokens(
        600,
        1,
        DAI,
      );
      await bank.connect(wallet1).withdrawTokens(
        100,
        1,
        DAI,
      );

      expect(await token.balanceOf(wallet1.address)).to.equal(3500);
    //   expect(
    //     await bank.accountBalances(wallet1.address, DAI)
    //   ).to.equal(500);
    })

    // it('should not allow withdrawing more than has been deposited', async function () {
    //   await expect(
    //     bank.connect(wallet1).withdrawTokens(10000, DAI)
    //   ).to.be.revertedWith("Insufficent funds")
    // })



})
})


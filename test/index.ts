const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("P2PTransactions", function () {
  let P2PTransactions:any;
  let p2pTransactions:any;
  let owner:any;
  let user1:any;
  let user2:any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    P2PTransactions = await ethers.getContractFactory("P2PTransactions");
    p2pTransactions = await P2PTransactions.deploy();
    await p2pTransactions.deployed();
  });

  it("should allow deposits", async function () {
    const depositAmount = ethers.utils.parseEther("1");
    await p2pTransactions.connect(user1).deposit({ value: depositAmount });

    const balance = await p2pTransactions.balances(user1.address);
    expect(balance).to.equal(depositAmount);
  });

  it("should allow transfers", async function () {
    const depositAmount = ethers.utils.parseEther("1");
    const transferAmount = ethers.utils.parseEther("0.5");

    await p2pTransactions.connect(user1).deposit({ value: depositAmount });
    await p2pTransactions.connect(user1).transfer(user2.address, transferAmount);

    const senderBalance = await p2pTransactions.balances(user1.address);
    const receiverBalance = await p2pTransactions.balances(user2.address);

    expect(senderBalance).to.equal(depositAmount.sub(transferAmount));
    expect(receiverBalance).to.equal(transferAmount);
  });

  it("should check the balance of an address", async function () {
    const depositAmount = ethers.utils.parseEther("1");

    await p2pTransactions.connect(user1).deposit({ value: depositAmount });

    const userBalance = await p2pTransactions.getBalance(user1.address);
    expect(userBalance).to.equal(depositAmount);
  });
});


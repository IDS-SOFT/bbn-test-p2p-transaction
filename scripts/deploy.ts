import { ethers } from "hardhat";

async function main() {

  const p2PTransactions = await ethers.deployContract("P2PTransactions");

  await p2PTransactions.waitForDeployment();

  console.log("P2PTransactions deployed to : ",await p2PTransactions.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

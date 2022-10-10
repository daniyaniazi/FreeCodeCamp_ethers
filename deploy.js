const ethers = require("ethers");
const fs = require("fs-extra");
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  const wallet = new ethers.Wallet(
    "0x4d4f435e2c797b07d581bbb5b1a6ce8df34a2b5fc31b8e0e0036895cce9a4f5f",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // Contract Factory
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Please wait , starting to deploy ....");
  const contract = await contractFactory.deploy();
  console.log("CONGRATULATIONS !! contract deployed");
  console.log(contract);
}
main();

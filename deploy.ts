import {ethers} from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

require("dotenv").config()
async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf-8"
    )
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf-8"
    )

    // Contract Factory
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Please wait , starting to deploy ....")
    const contract = await contractFactory.deploy()
    console.log("CONGRATULATIONS !! contract deployed", contract.address)
    // console.log(contract)
    const deploymentRecipet = await contract.deployTransaction.wait(1)
    // console.log(deploymentRecipet)

    /// / Send Transaction with pure ethers and js
    // const nonce = await wallet.getTransactionCount();
    // tx = {
    //   nonce: nonce,
    //   gasPrice: 100000000000,
    //   gasLimit: 1000000,
    //   to: null,
    //   value: 0,
    //   data: "your bin here",
    //   //   chainId: 1337,
    // };

    // console.log("Let's deploy another! Please wait...");
    // // let resp = await wallet.signTransaction(tx)
    // const sentTxResponse = await wallet.sendTransaction(tx);
    // console.log(sentTxResponse);

    // Interact with contract
    const currentFavNumber = await contract.retrieve()
    console.log("Current Fav", currentFavNumber.toString())

    const storeTransaction = await contract.store("5")
    const storeTransactionRecipet = await storeTransaction.wait(1)

    const updatedFavNumber = await contract.retrieve()
    console.log("Updated Fav", updatedFavNumber.toString())
}
main()

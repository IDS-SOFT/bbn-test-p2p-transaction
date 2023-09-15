// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract P2PTransactions {

    mapping(address => uint256) public balances;
    event CheckBalance(string text, uint amount);
    
    constructor() {}

    // Function to deposit funds into the contract
    function deposit() external payable {
        require(msg.value > 0, "You must deposit some cryptocurrency.");
        balances[msg.sender] += msg.value;
    }

    // Function to transfer funds to another user
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance.");
        require(msg.sender != to, "You cannot transfer funds to yourself.");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    // Function to check the balance of an address
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}

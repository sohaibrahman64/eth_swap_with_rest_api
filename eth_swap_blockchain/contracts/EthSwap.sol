// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "./SamuraiToken.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    SamuraiToken public token;
    uint256 public rate = 100;

    event TokenPurchased (
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(SamuraiToken _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        // Redemption Rate = # tokens they receive for 1 ether
        // Amount of Ethereum * Redemption rate

        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;

        // Require that EthSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // Transfer 
        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);

    }

    function sellTokens(uint _amount) public {
        // User can't sell more tokens that they have
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of ether to redeem
        uint etherAmount = _amount / rate;

        // Require that EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        // Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}
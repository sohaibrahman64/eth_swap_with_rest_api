// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract SamuraiToken {
    // Name
    string public name = 'Samurai Token';
    string public symbol = 'SAM';
    string public standard = 'SamuraiToken v1.0';
    uint256 public totalSupply = 10000000000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        // allocate the total supply
        balanceOf[msg.sender] = totalSupply;
    }

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // Approve
    function approve(address _spender, uint256 _value) public returns (bool success) {
        // allowance
        allowance[msg.sender][_spender] = _value;

        // Approve Event
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // Require _from has enough tokens
        require(_value <= balanceOf[_from]);

        // Require allowance is big enough
        require(_value <= allowance[_from][msg.sender]);

        // Change the balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        // Update the allowance 
        allowance[_from][msg.sender] -= _value;

        // Transfer event
        emit Transfer(_from, _to, _value);

        // return a boolean
        return true;
    }
}



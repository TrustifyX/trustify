// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./VerificationRegistry.sol";
import "hardhat/console.sol";

contract PermissionedToken is Ownable, ERC20 {
    address private verificationRegistryAddress;
    VerificationRegistry private verificationRegistry;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    function setRegistry(address account) external onlyOwner {
        verificationRegistryAddress = account;
        if (verificationRegistryAddress != address(0)) {
            verificationRegistry = VerificationRegistry(
                verificationRegistryAddress
            );
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        if (verificationRegistryAddress != address(0)) {
            // if the registry was always present, then the sender will always have been permissioned
            // because otherwise the account never could have received, but since the registry
            // may be removed by the Owner, we check the sender as well as receiver in this example
            require(
                _validCounterparty(from),
                "PermissionedToken: Invalid Sender"
            );
            require(
                _validCounterparty(to),
                "PermissionedToken: Invalid Recipient"
            );
        }
    }

    function _validCounterparty(address account) private view returns (bool) {
        // the Token could retrieve the verifications and filter based on
        // rules it applies regarding which records are acceptable, but in
        // this example, the Token merely tests for the presence of any valid
        // non-revoked non-expired verification record
        return verificationRegistry.isVerified(account);
    }
}

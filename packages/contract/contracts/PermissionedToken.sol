// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./VerificationRegistry.sol";
import "hardhat/console.sol";

contract PermissionedToken is Ownable, ERC20 {
    // this token uses a VerificationRegistry for KYC verifications
    // additional registries for other types of credentials could also be used
    address private kycRegistryAddress;
    VerificationRegistry private kycRegistry;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    function setVerificationRegistry(address registryAddress)
        external
        onlyOwner
    {
        kycRegistryAddress = registryAddress;
        if (kycRegistryAddress != address(0)) {
            kycRegistry = VerificationRegistry(kycRegistryAddress);
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        if (kycRegistryAddress != address(0)) {
            // if the registry was always present, then the sender will always have been permissioned
            // because otherwise the registryAddress never could have received, but since the registry
            // may be removed by the Owner, we check the sender as well as receiver in this example
            require(
                _validCounterparty(from),
                "PermissionedToken: Sender is not verified"
            );
            require(
                _validCounterparty(to),
                "PermissionedToken: Recipient in not verified"
            );
        }
    }

    function _validCounterparty(address registryAddress)
        private
        view
        returns (bool)
    {
        // the Token could retrieve the verifications and filter based on
        // rules it applies regarding which records are acceptable, but in
        // this example, the Token merely tests for the presence of any valid
        // non-revoked non-expired verification record
        return kycRegistry.isVerified(registryAddress);
    }
}

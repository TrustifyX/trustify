// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IVerificationRegistry.sol";

contract PermissionedToken is Ownable, ERC20 {
    /**
     * @dev This token uses a VerificationRegistry for KYC verifications.
     * Additional registries for other types of credentials could also be used.
     */
    address private kycRegistryAddress;
    IVerificationRegistry private kycRegistry;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev In this example, the contract owner can add, remove, and replace the registry
     * implementation that is used to manage verifications.
     */
    function setVerificationRegistry(address registryAddress)
        external
        onlyOwner
    {
        kycRegistryAddress = registryAddress;
        if (kycRegistryAddress != address(0)) {
            kycRegistry = IVerificationRegistry(kycRegistryAddress);
        }
    }

    /**
     * @dev This hook executes as part of the ERC20 transfer implementation. In this
     * example, it ensures that the sender and recipient are verified counterparties.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        if (kycRegistryAddress != address(0)) {
            require(
                _validCounterparty(from),
                "PermissionedToken: Sender is not verified"
            );
            require(
                _validCounterparty(to),
                "PermissionedToken: Recipient is not verified"
            );
        }
    }

    /**
     * @dev The Token could retrieve the verifications and filter based on
     * rules it applies regarding which records are acceptable, but in
     * this example, the Token merely tests for the presence of any valid
     * non-revoked non-expired verification record.
     */
    function _validCounterparty(address registryAddress)
        private
        view
        returns (bool)
    {
        return kycRegistry.isVerified(registryAddress);
    }
}

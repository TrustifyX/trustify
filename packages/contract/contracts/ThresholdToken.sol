// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./VerificationRegistry.sol";
import "hardhat/console.sol";

contract ThresholdToken is ERC20, VerificationRegistry {
    uint256 private _credentialThreshold = 10;

    constructor(uint256 initialSupply)
        ERC20("Threshold Example Coin", "THUSD")
    {
        _mint(msg.sender, initialSupply);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        if (owner() != msg.sender) {
            bool isSenderVerified = this.isVerified(from);
            require(
                isSenderVerified || amount < _credentialThreshold,
                "ThresholdToken: Transfers of this amount require sender verification"
            );
            // for the sake of demonstration, we're removing verifications
            // and requiring them again for new transfers
            if (isSenderVerified) {
                this.removeVerification(
                    this.getVerificationsForSubject(msg.sender)[0].uuid
                );
            }
        }
    }

    /**
     * A function to confirm a credential and transact in the same transaction.
     */
    function validateAndTransfer(
        address to,
        uint256 amount,
        VerificationResult memory verificationResult,
        bytes memory signature
    ) public {
        registerVerificationBySubject(verificationResult, signature);
        super.transfer(to, amount);
    }

    /**
     * Convenience method to return the threshold over which verification
     * is required. This is an overly-simplified example, in the real world
     * more sophisticated logic would likely trigger verification.
     */
    function getThreshold() external view returns (uint256) {
        return _credentialThreshold;
    }

    function setThreshold(uint256 t) external onlyOwner {
        _credentialThreshold = t;
    }
}

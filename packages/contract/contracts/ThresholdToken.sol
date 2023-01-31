// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./VerificationRegistry.sol";
import "hardhat/console.sol";

contract ThresholdToken is ERC20, VerificationRegistry {
    uint256 private _CREDENTIAL_THRESHOLD = 10;

    constructor(uint256 initialSupply)
        ERC20("Example With Verficiation", "VUSDC")
    {
        _mint(msg.sender, initialSupply);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        require(
            amount < _CREDENTIAL_THRESHOLD,
            "Transfers of this amount require validateAndTransfer"
        );
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
    function verificationThreshold() external view returns (uint256) {
        return _CREDENTIAL_THRESHOLD;
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

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

    /**
     * @dev This hook executes as part of the ERC20 transfer implementation. In this
     * example, it ensures that the amount transferred is either below a demo
     * threshold, or that the caller has been verified. If those conditions are
     * not met, then the error will cause the demo Dapp to start verification and
     * will subsequently call validateAndTransfer, using the subject-submitted
     * VerificationResult path.
     *
     * See PermissionedToken.sol for an alternative to this example that uses
     * verfier-submitted results and delegation rather than inheritance.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        if (owner() != msg.sender) {
            require(
                amount < _credentialThreshold || this.isVerified(from),
                "ThresholdToken: Transfers of this amount require sender verification"
            );
        }
    }

    /**
     * @dev A function to confirm a credential and transact in the same transaction.
     */
    function validateAndTransfer(
        address to,
        uint256 amount,
        VerificationResult memory verificationResult,
        bytes memory signature
    ) public {
        if (!this.isVerified(msg.sender)) {
            _registerVerificationBySubject(verificationResult, signature);
        }
        super.transfer(to, amount);
    }

    /**
     * @dev Convenience methods to get/set the threshold over which verification
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

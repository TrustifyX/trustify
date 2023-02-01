// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/**
 * @dev Info about Verifiers
 */
struct VerifierInfo {
    bytes32 name;
    string did;
    string url;
    address signer;
}

/**
 * @dev A verifier will submit a verification result in this format.
 */
struct VerificationResult {
    string schema; // indicator of the type of verification result
    address subject; // address of the subject of the verification
    uint256 expiration; // expiration of verification (may or may not be expiration of the VC)
}

/**
 * @dev The registry will accept VerificationResults submitted to it,
 * and if valid, will persist them on-chain as VerificationRecords
 */
struct VerificationRecord {
    bytes32 uuid; // generated in contract, and also enables offchain verifier-persisted info related to verification
    address verifier; // address of verifier, can be used to pull VerifierInfo
    address subject; // address of the subject, the recipient of a successful verification
    uint256 entryTime; // time at which the verification was proven and recorded (not the time of verification)
    uint256 expirationTime; // expiration of verification (may or may not be expiration of the VC)
    bool revoked; // revoked or valid and active
}

/**
 * @title Interface defining basic VerificationRegistry functionality.
 */
interface IVerificationRegistry {
    /**********************/
    /* EVENT DECLARATIONS */
    /**********************/

    event VerifierAdded(address verifier, VerifierInfo verifierInfo);
    event VerifierUpdated(address verifier, VerifierInfo verifierInfo);
    event VerifierRemoved(address verifier);

    event VerificationResultConfirmed(VerificationRecord verificationRecord);
    event VerificationRevoked(bytes32 uuid);
    event VerificationRemoved(bytes32 uuid);

    /*****************************/
    /* VERIFIER MANAGEMENT LOGIC */
    /*****************************/

    /**
     * @dev The Owner adds a Verifier Delegate to the contract.
     */
    function addVerifier(
        address verifierAddress,
        VerifierInfo memory verifierInfo
    ) external;

    /**
     * @dev Query whether an address is a Verifier Delegate.
     */
    function isVerifier(address account) external view returns (bool);

    /**
     * @dev Retrieve the number of registered Verifier Delegates
     */
    function getVerifierCount() external view returns (uint256);

    /**
     * @dev Request information about a Verifier based on its signing address.
     */
    function getVerifier(address verifierAddress)
        external
        view
        returns (VerifierInfo memory);

    /**
     * @dev The onwer updates an existing Verifier Delegate's did, URL, and name.
     */
    function updateVerifier(
        address verifierAddress,
        VerifierInfo memory verifierInfo
    ) external;

    /**
     * @dev The owner can remove a Verifier Delegate from the contract.
     */
    function removeVerifier(address verifierAddress) external;

    /**********************/
    /* VERIFICATION LOGIC */
    /**********************/

    /**
     * @dev Retrieve the current total number of registered VerificationRecords
     */
    function getVerificationCount() external view returns (uint256);

    /**
     * @dev Determine whether the subject address has a verification record that is not expired
     */
    function isVerified(address subject) external view returns (bool);

    /**
     * @dev Retrieve a specific Verification Record by its uuid
     */
    function getVerification(bytes32 uuid)
        external
        view
        returns (VerificationRecord memory);

    /**
     * @dev Retrieve all of the verification records associated with this subject address
     */
    function getVerificationsForSubject(address subject)
        external
        view
        returns (VerificationRecord[] memory);

    /**
     * @dev Retrieve all of the verification records associated with this verifier address
     */
    function getVerificationsForVerifier(address verifier)
        external
        view
        returns (VerificationRecord[] memory);

    /**
     * @dev Verifiers can revoke Verification Records they previously created
     */
    function revokeVerification(bytes32 uuid) external;

    /**
     * @dev Verifiers can remove verifications they previously created. Nothing is
     * truly 'deleted' from on-chain storage, as the record exists in previous
     * state, but this does prevent the record from usage in the future.
     */
    function removeVerification(bytes32 uuid) external;

    /**
     * @dev A verifier registers a VerificationResult after it has executed a
     * successful verification. The contract will validate the result, and
     * if it is valid and is signed by this calling verifier's signer,
     * then the resulting VerificationRecord will be persisted and returned.
     */
    function registerVerification(
        VerificationResult memory verificationResult,
        bytes memory signature
    ) external returns (VerificationRecord memory);
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "hardhat/console.sol";

contract VerificationRegistry is
    Ownable,
    EIP712("VerificationRegistry", "1.0")
{
    /**
     * A verifier will submit a verification result in this format.
     */
    struct VerificationResult {
        string schema;
        address subject;
        uint256 expiration; // expiration of verification (may or may not be expiration of the VC)
        bytes32 payload; // arbitrary data associated with the verification that may be employed in app logic
    }

    struct VerificationRecord {
        bytes32 uuid; // generated in contract, and also enables offchain verifier-persisted info related to verification
        address verifier; // address of verifier, can be used to pull VerifierInfo
        address subject; // address of the subject, the recipient of a successful verification
        uint256 entryTime; // time at which the verification was proven and recorded (not the time of verification)
        uint256 expirationTime; // expiration of verification (may or may not be expiration of the VC)
        bool revoked; // revoked or valid and active
    }

    // all verification records keyed by their uuids
    mapping(bytes32 => VerificationRecord) private _verifications;

    // verifications mapped to subject addresses (those who receive verifications)
    mapping(address => bytes32[]) private _verificationsForSubject;

    // verfications issued by a given trusted verifier (those who execute verifications)
    mapping(address => bytes32[]) private _verificationsForVerifier;

    uint256 private _verificationRecordCount;

    function getVerificationCount() external view returns (uint256) {
        return _verifierCount;
    }

    /**
     * Determine whether the subject address has a verification record that is not expired
     */
    function isVerified(address subject) external view returns (bool) {
        bytes32[] memory subjectRecords = _verificationsForSubject[subject];
        for (uint i = 0; i < subjectRecords.length; i++) {
            VerificationRecord memory record = _verifications[
                subjectRecords[i]
            ];
            if (!record.revoked && record.expirationTime > block.timestamp) {
                return true;
            }
        }
        return false;
    }

    /**
     * Retrieve a specific Verification Record by its uuid
     */
    function getVerification(bytes32 uuid)
        external
        view
        returns (VerificationRecord memory)
    {
        return _verifications[uuid];
    }

    /**
     * Retrieve all of the verification records associated with this subject address
     */
    function getVerificationsForSubject(address subject)
        external
        view
        returns (VerificationRecord[] memory)
    {
        bytes32[] memory subjectRecords = _verificationsForSubject[subject];
        VerificationRecord[] memory records = new VerificationRecord[](
            subjectRecords.length
        );
        for (uint i = 0; i < subjectRecords.length; i++) {
            VerificationRecord memory record = _verifications[
                subjectRecords[i]
            ];
            records[i] = record;
        }
        return records;
    }

    /**
     * Retrieve all of the verification records associated with this verifier address
     */
    function getVerificationsForVerifier(address verifier)
        external
        view
        returns (VerificationRecord[] memory)
    {
        bytes32[] memory verifierRecords = _verificationsForVerifier[verifier];
        VerificationRecord[] memory records = new VerificationRecord[](
            verifierRecords.length
        );
        for (uint i = 0; i < verifierRecords.length; i++) {
            VerificationRecord memory record = _verifications[
                verifierRecords[i]
            ];
            records[i] = record;
        }
        return records;
    }

    /**
     * Verifiers can revoke Verification Records they previously created
     */
    function revokeVerification(bytes32 uuid) external onlyVerifier {
        require(
            _verifications[uuid].verifier == msg.sender,
            "VerificationRegistry: Caller is not the original verifier"
        );
        _verifications[uuid].revoked = true;
    }

    /**
     * Subjects can remove verifications about themselves, and
     * verifiers can remove verifications they previously created
     */
    function removeVerification(bytes32 uuid) external {
        require(
            (_verifications[uuid].subject == msg.sender) ||
                (_verifications[uuid].verifier == msg.sender),
            "VerificationRegistry: Caller is neither the subject nor the verifier of the referenced record"
        );
        delete _verifications[uuid];
    }

    /**
     * Verifier Delegate addresses that sign verification results mapped to
     * metadata about the Verifier Delegates.
     */
    mapping(address => VerifierInfo) private _verifiers;

    uint256 _verifierCount;

    /**
     * Info about Verifier Delegates
     */
    struct VerifierInfo {
        bytes32 name;
        string did;
        string url;
        address signer;
    }

    event VerifierAdded(address verifier, VerifierInfo verifierInfo);
    event VerifierUpdated(address verifier, VerifierInfo verifierInfo);
    event VerifierRemoved(address verifier);

    event VerificationResultConfirmed(
        address verifierAddress,
        VerificationRecord verificationRecord
    );

    modifier onlyVerifier() {
        require(
            _verifiers[msg.sender].name != 0,
            "VerificationRegistry: Caller is not a Verifier Delegate"
        );
        _;
    }

    /**
     * The Owner adds a Verifier Delegate to the contract.
     */
    function addVerifier(
        address verifierAddress,
        VerifierInfo memory verifierInfo
    ) external onlyOwner {
        require(
            _verifiers[verifierAddress].name == 0,
            "VerificationRegistry: Verifier Address Exists"
        );
        _verifiers[verifierAddress] = verifierInfo;
        _verifierCount++;
        emit VerifierAdded(verifierAddress, verifierInfo);
    }

    /**
     * Query whether an address is a Verifier Delegate.
     */
    function isVerifier(address account) external view returns (bool) {
        return _verifiers[account].name != 0;
    }

    /**
     * Retrieve the number of registered Verifier Delegates
     */
    function getVerifierCount() external view returns (uint) {
        return _verifierCount;
    }

    /**
     * Request information about a Verifier Delegate based on its signing address.
     */
    function getVerifier(address verifierAddress)
        external
        view
        returns (VerifierInfo memory)
    {
        require(
            _verifiers[verifierAddress].name != 0,
            "VerificationRegistry: Unknown Verifier Address"
        );
        return _verifiers[verifierAddress];
    }

    /**
     * The onwer updates an existing Verifier Delegate's did, URL, and name.
     */
    function updateVerifier(
        address verifierAddress,
        VerifierInfo memory verifierInfo
    ) external onlyOwner {
        require(
            _verifiers[verifierAddress].name != 0,
            "VerificationRegistry: Unknown Verifier Address"
        );
        _verifiers[verifierAddress] = verifierInfo;
        emit VerifierUpdated(verifierAddress, verifierInfo);
    }

    /**
     * The owner can remove a Verifier Delegate from the contract.
     */
    function removeVerifier(address verifierAddress) external onlyOwner {
        require(
            _verifiers[verifierAddress].name != 0,
            "VerificationRegistry: Verifier Address Does Not Exist"
        );
        delete _verifiers[verifierAddress];
        _verifierCount--;
        emit VerifierRemoved(verifierAddress);
    }

    /**
     * A verifier provides a signed hash of a verification result it
     * has created for a subject address. This function recreates the hash
     * given the result artifacts and then uses it and the signature to recover
     * the public address of the signer. If that address is a trusted verifier
     * address, and the assessment completes within the deadline (unix time in
     * seconds since epoch), then the verification succeeds and can be reused
     * by this specific caller until the confirmation expires.
     */
    function registerVerification(
        VerificationResult memory verificationResult,
        bytes memory signature
    ) external onlyVerifier {
        // Recreate the hash using the verification results data. The expiration and subject
        // are signed in the hash in order to prevent verified clients from setting or changing
        // their own expiration times, and to prevent other subjects from using this same verification.

        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256(
                        "VerificationResult(string schema,address subject,uint256 expiration,bytes32 payload)"
                    ),
                    keccak256(bytes(verificationResult.schema)),
                    verificationResult.subject,
                    verificationResult.expiration,
                    verificationResult.payload
                )
            )
        );

        // TODO add hook so that payload data can be evaluated against contract logic

        // use OpenZeppelin ECDSA to recover the public address corresponding to the
        // signature and regenerated hash:
        address signer = ECDSA.recover(digest, signature);

        require(
            _verifiers[msg.sender].signer == signer,
            "VerificationRegistry:: Signed digest cannot be verified"
        );
        require(
            verificationResult.expiration > block.timestamp,
            "VerificationRegistry:: Verification confirmation expired"
        );

        // create a VerificationRecord and persist it, map it to verifier, map it to subject
        VerificationRecord memory verificationRecord = VerificationRecord({
            uuid: 0,
            verifier: msg.sender,
            subject: verificationResult.subject,
            entryTime: block.timestamp,
            expirationTime: verificationResult.expiration,
            revoked: false
        });

        bytes32 uuid = _createVerificationRecordUUID(verificationRecord);
        verificationRecord.uuid = uuid;
        _verifications[uuid] = verificationRecord;
        _verificationsForSubject[verificationRecord.subject].push(uuid);
        _verificationsForVerifier[verificationRecord.verifier].push(uuid);
        _verificationRecordCount++;

        emit VerificationResultConfirmed(signer, verificationRecord);
    }

    function _createVerificationRecordUUID(
        VerificationRecord memory verificationRecord
    ) private view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    verificationRecord.verifier,
                    verificationRecord.subject,
                    verificationRecord.entryTime,
                    verificationRecord.expirationTime,
                    _verificationRecordCount
                )
            );
    }
}

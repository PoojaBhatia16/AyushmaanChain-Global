// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract InsuranceClaimRegistry {

    struct Claim {
        address patient;
        address hospital;
        address insuranceProvider;
        string treatmentId;
        string claimHash;
        bool approved;
        uint256 timestamp;
    }

    mapping(string => Claim) public claims;

    event ClaimSubmitted(
        string claimId,
        address patient,
        address hospital
    );

    event ClaimApproved(string claimId);

    function submitClaim(
        string memory _claimId,
        address _patient,
        address _insuranceProvider,
        string memory _treatmentId,
        string memory _claimHash
    ) public {

        claims[_claimId] = Claim({
            patient: _patient,
            hospital: msg.sender,
            insuranceProvider: _insuranceProvider,
            treatmentId: _treatmentId,
            claimHash: _claimHash,
            approved: false,
            timestamp: block.timestamp
        });

        emit ClaimSubmitted(_claimId, _patient, msg.sender);
    }

    function approveClaim(string memory _claimId) public {

        require(
            msg.sender == claims[_claimId].insuranceProvider,
            "Not authorized"
        );

        claims[_claimId].approved = true;

        emit ClaimApproved(_claimId);
    }

    function getClaim(string memory _claimId)
        public
        view
        returns (Claim memory)
    {
        return claims[_claimId];
    }
}
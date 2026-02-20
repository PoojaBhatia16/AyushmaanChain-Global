// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RehabReferralRegistry {

    struct Referral {
        address patient;
        address hospital;
        address rehabCenter;
        string referralHash;
        uint256 timestamp;
    }

    mapping(string => Referral) public referrals;

    event ReferralCreated(
        string referralId,
        address patient,
        address rehabCenter
    );

    function createReferral(
        string memory _referralId,
        address _patient,
        address _rehabCenter,
        string memory _referralHash
    ) public {

        referrals[_referralId] = Referral({
            patient: _patient,
            hospital: msg.sender,
            rehabCenter: _rehabCenter,
            referralHash: _referralHash,
            timestamp: block.timestamp
        });

        emit ReferralCreated(_referralId, _patient, _rehabCenter);
    }
}
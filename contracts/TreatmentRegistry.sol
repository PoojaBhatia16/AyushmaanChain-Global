// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TreatmentRegistry {

    struct Treatment {
        address patient;
        address hospital;
        string packageId;
        string treatmentHash;
        uint256 timestamp;
    }

    mapping(string => Treatment) public treatments;

    event TreatmentRecorded(
        string treatmentId,
        address patient,
        address hospital,
        string treatmentHash
    );

    function recordTreatment(
        string memory _treatmentId,
        address _patient,
        string memory _packageId,
        string memory _treatmentHash
    ) public {

        treatments[_treatmentId] = Treatment({
            patient: _patient,
            hospital: msg.sender,
            packageId: _packageId,
            treatmentHash: _treatmentHash,
            timestamp: block.timestamp
        });

        emit TreatmentRecorded(
            _treatmentId,
            _patient,
            msg.sender,
            _treatmentHash
        );
    }

    function getTreatment(string memory _treatmentId)
        public
        view
        returns (Treatment memory)
    {
        return treatments[_treatmentId];
    }
}
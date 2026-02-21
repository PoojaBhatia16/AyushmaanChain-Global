// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ServiceRequestRegistry {

    enum ServiceStatus {
        REQUESTED,
        APPROVED,
        REJECTED,
        INSURANCE_PENDING,
        INSURANCE_APPROVED,
        COMPLETED
    }

    struct ServiceRequest {

        string requestId;

        address patient;
        address hospital;

        string packageId;

        string patientMetadataHash;
        string insuranceMetadataHash;

        ServiceStatus status;

        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(string => ServiceRequest) public requests;

    mapping(address => string[]) public patientRequests;
    mapping(address => string[]) public hospitalRequests;

    string[] public allRequestIds;

    event ServiceRequested(
        string requestId,
        address indexed patient,
        address indexed hospital,
        string packageId
    );

    event ServiceApproved(
        string requestId,
        address indexed hospital
    );

    event ServiceRejected(
        string requestId,
        address indexed hospital
    );

    event InsuranceApproved(
        string requestId,
        address indexed insuranceProvider
    );

    event ServiceCompleted(
        string requestId,
        address indexed hospital,
        string treatmentHash
    );


    // PATIENT creates service request
    function createServiceRequest(

        string memory _requestId,
        address _hospital,
        string memory _packageId,
        string memory _patientMetadataHash,
        string memory _insuranceMetadataHash

    ) public {

        require(
            requests[_requestId].createdAt == 0,
            "Request already exists"
        );

        requests[_requestId] = ServiceRequest({

            requestId: _requestId,

            patient: msg.sender,
            hospital: _hospital,

            packageId: _packageId,

            patientMetadataHash: _patientMetadataHash,
            insuranceMetadataHash: _insuranceMetadataHash,

            status: ServiceStatus.REQUESTED,

            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        patientRequests[msg.sender].push(_requestId);
        hospitalRequests[_hospital].push(_requestId);

        allRequestIds.push(_requestId);

        emit ServiceRequested(
            _requestId,
            msg.sender,
            _hospital,
            _packageId
        );
    }


    // HOSPITAL approves service
    function approveService(string memory _requestId) public {

        ServiceRequest storage req = requests[_requestId];

        require(msg.sender == req.hospital, "Not hospital");

        req.status = ServiceStatus.APPROVED;
        req.updatedAt = block.timestamp;

        emit ServiceApproved(_requestId, msg.sender);
    }


    // HOSPITAL rejects service
    function rejectService(string memory _requestId) public {

        ServiceRequest storage req = requests[_requestId];

        require(msg.sender == req.hospital, "Not hospital");

        req.status = ServiceStatus.REJECTED;
        req.updatedAt = block.timestamp;

        emit ServiceRejected(_requestId, msg.sender);
    }


    // INSURANCE approves claim
    function approveInsurance(string memory _requestId) public {

        ServiceRequest storage req = requests[_requestId];

        require(
            req.status == ServiceStatus.APPROVED,
            "Service not approved yet"
        );

        req.status = ServiceStatus.INSURANCE_APPROVED;
        req.updatedAt = block.timestamp;

        emit InsuranceApproved(_requestId, msg.sender);
    }


    // HOSPITAL completes treatment
    function completeService(

        string memory _requestId,
        string memory _treatmentHash

    ) public {

        ServiceRequest storage req = requests[_requestId];

        require(msg.sender == req.hospital, "Not hospital");

        require(
            req.status == ServiceStatus.INSURANCE_APPROVED,
            "Insurance not approved"
        );

        req.status = ServiceStatus.COMPLETED;
        req.updatedAt = block.timestamp;

        emit ServiceCompleted(
            _requestId,
            msg.sender,
            _treatmentHash
        );
    }


    // VIEW FUNCTIONS


    function getRequest(string memory _requestId)
        public
        view
        returns (ServiceRequest memory)
    {
        return requests[_requestId];
    }


    function getPatientRequests(address _patient)
        public
        view
        returns (string[] memory)
    {
        return patientRequests[_patient];
    }


    function getHospitalRequests(address _hospital)
        public
        view
        returns (string[] memory)
    {
        return hospitalRequests[_hospital];
    }


    function getAllRequests()
        public
        view
        returns (string[] memory)
    {
        return allRequestIds;
    }
}
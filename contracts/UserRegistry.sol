// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserRegistry {

    struct User {
        string userType;
        bool registered;
    }

    mapping(address => User) public users;

    address[] public doctors;
    address[] public pharmacists;
    address[] public hospitals;   // ✅ NEW

    event UserRegistered(address indexed user, string userType);

    function registerUser(string memory _userType) public {

        require(!users[msg.sender].registered, "User already registered");

        bytes32 role = keccak256(abi.encodePacked(_userType));

        require(
            role == keccak256("patient") ||
            role == keccak256("doctor") ||
            role == keccak256("hospital") ||
            role == keccak256("pharmacist") ||
            role == keccak256("manufacturer") ||
            role == keccak256("distributor") ||
            role == keccak256("admin"),
            "Invalid user type"
        );

        users[msg.sender] = User({
            userType: _userType,
            registered: true
        });

        // Push into respective arrays
        if (role == keccak256("doctor")) {

            doctors.push(msg.sender);

        } else if (role == keccak256("pharmacist")) {

            pharmacists.push(msg.sender);

        } else if (role == keccak256("hospital")) {

            hospitals.push(msg.sender);   // ✅ NEW

        }

        emit UserRegistered(msg.sender, _userType);
    }


    // EXISTING FUNCTIONS

    function isRegistered(address _user)
        external
        view
        returns (bool)
    {
        return users[_user].registered;
    }

    function getUserType(address _user)
        external
        view
        returns (string memory)
    {
        return users[_user].userType;
    }

    function isDoctor(address _user)
        external
        view
        returns (bool)
    {
        return keccak256(abi.encodePacked(users[_user].userType))
            == keccak256("doctor");
    }

    function isPharmacist(address _user)
        external
        view
        returns (bool)
    {
        return keccak256(abi.encodePacked(users[_user].userType))
            == keccak256("pharmacist");
    }


    // ✅ NEW FUNCTION — GET ALL HOSPITALS

    function getHospitals()
        external
        view
        returns (address[] memory)
    {
        return hospitals;
    }


    // EXISTING FUNCTIONS

    function getDoctors()
        external
        view
        returns (address[] memory)
    {
        return doctors;
    }

    function getPharmacists()
        external
        view
        returns (address[] memory)
    {
        return pharmacists;
    }
}
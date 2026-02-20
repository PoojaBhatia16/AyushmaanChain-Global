// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HospitalPackageRegistry {

    struct Package {
        address hospital;
        string packageId;
        string name;
        uint256 price;
        string metadataHash;
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Package) public packages;
    string[] public packageIds;

    event PackageCreated(
        string packageId,
        address hospital,
        string name,
        uint256 price,
        string metadataHash
    );

    function createPackage(
        string memory _packageId,
        string memory _name,
        uint256 _price,
        string memory _metadataHash
    ) public {

        require(!packages[_packageId].exists, "Package exists");

        packages[_packageId] = Package({
            hospital: msg.sender,
            packageId: _packageId,
            name: _name,
            price: _price,
            metadataHash: _metadataHash,
            timestamp: block.timestamp,
            exists: true
        });

        packageIds.push(_packageId);

        emit PackageCreated(
            _packageId,
            msg.sender,
            _name,
            _price,
            _metadataHash
        );
    }

    function getPackage(string memory _packageId)
        public
        view
        returns (Package memory)
    {
        require(packages[_packageId].exists, "Package not found");
        return packages[_packageId];
    }

    function getAllPackages() public view returns (string[] memory) {
        return packageIds;
    }
}
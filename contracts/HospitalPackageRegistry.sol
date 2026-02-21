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
    
    // New mapping to track packages by hospital address
    mapping(address => string[]) public hospitalPackages;

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
        
        // Add package ID to hospital's package list
        hospitalPackages[msg.sender].push(_packageId);

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
    
    /**
     * @dev Get all package IDs created by a specific hospital
     * @param _hospital The hospital address to query
     * @return string[] Array of package IDs created by the hospital
     */
    function getHospitalPackages(address _hospital) 
        public 
        view 
        returns (string[] memory) 
    {
        return hospitalPackages[_hospital];
    }
    
    /**
     * @dev Get all package details for a specific hospital
     * @param _hospital The hospital address to query
     * @return Package[] Array of complete package structs
     */
    function getHospitalPackagesDetails(address _hospital) 
        public 
        view 
        returns (Package[] memory) 
    {
        string[] memory packageIdsList = hospitalPackages[_hospital];
        Package[] memory hospitalPackageDetails = new Package[](packageIdsList.length);
        
        for (uint i = 0; i < packageIdsList.length; i++) {
            hospitalPackageDetails[i] = packages[packageIdsList[i]];
        }
        
        return hospitalPackageDetails;
    }
    
    /**
     * @dev Get count of packages created by a specific hospital
     * @param _hospital The hospital address to query
     * @return uint Number of packages
     */
    function getHospitalPackageCount(address _hospital) 
        public 
        view 
        returns (uint) 
    {
        return hospitalPackages[_hospital].length;
    }
}
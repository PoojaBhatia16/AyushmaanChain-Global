import { useState, useEffect } from "react";
import useHospitalPackageRegistry from "./useHospitalPackageRegistry";

const usePackages = () => {

  const { contract } = useHospitalPackageRegistry();

  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {

    if (!contract) return;

    const ids = await contract.getAllPackages();

    const data = [];

    for (let id of ids) {

      const pkg = await contract.getPackage(id);

      data.push({
        packageId: pkg.packageId,
        name: pkg.name,
        price: pkg.price.toString(),
        metadataHash: pkg.metadataHash,
        hospital: pkg.hospital
      });
    }

    setPackages(data);
  };

  useEffect(()=>{
    fetchPackages();
  },[contract]);

  return { packages, fetchPackages };
};

export default usePackages;
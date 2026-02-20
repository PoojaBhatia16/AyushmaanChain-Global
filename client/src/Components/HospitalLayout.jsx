// src/Components/HospitalLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import HospitalSidebar from "../Pages/Hospital/Sidebar";

const HospitalLayout = () => {
  return (
    <div className="flex">
      <HospitalSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default HospitalLayout;
import React from "react";
import AddPoints from "./AddPoints";
import MintHthonCertificate from "./MintHthonCertificate";
import Tasks from "./Tasks"; 

const API_URL_PROD = "https://api.ethicalspectacle.com/";

const Admin = () => {
  return (
    <div className="admin-container">
      <h2 className="text-center text-3xl mt-5">Admin Dashboard</h2>
      <div className="admin-components">
        <AddPoints apiUrl={API_URL_PROD}/>
        <MintHthonCertificate apiUrl={API_URL_PROD}/>
        <Tasks apiUrl={API_URL_PROD}/>
      </div>
    </div>
  );
};

export default Admin;

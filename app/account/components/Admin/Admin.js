import React from "react";
import AddPoints from "./AddPoints";
import MintHthonCertificate from "./MintHthonCertificate";

const API_URL_PROD = "https://api.ethicalspectacle.com/";

const Admin = () => {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-components">
        <AddPoints apiUrl={API_URL_PROD}/>
        <MintHthonCertificate apiUrl={API_URL_PROD}/>
      </div>
    </div>
  );
};

export default Admin;

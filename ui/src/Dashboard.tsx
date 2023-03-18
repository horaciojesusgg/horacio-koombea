import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ContactTable from "./ContactsTable";
import ContactFilesTable from "./ContactFilesTable";
import FileUpload from "./FileUpload";

const Dashboard = () => {
  const [authenticated, setauthenticated] = useState<string | null>(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
   if (loggedInUser) {
        setauthenticated(loggedInUser);
    }
  }, []);

  if (authenticated) {
    return (
        <div>
            <h2>Contacts List</h2>
            <ContactTable />
            <br></br>
            <h2>Contact Files Uploaded</h2>
            <ContactFilesTable />
            <br></br>
            <h2>Upload a contacts file</h2>
            <FileUpload apiUrl=""/>

        </div>
    );
  } else {
    return (
      <div>
        <p>Plase log in!</p>
      </div>
    )
  }
};

export default Dashboard;
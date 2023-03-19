import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface ContactFiles {
  id: string;
  fileName: string;
  size: string;
  status: string;
  errors: string;

}

const ContactFilesTable: React.FC = () => {
  const [contactFiles, setContactFiles] = useState<ContactFiles[]>([]);
  const colums = [
    { field: 'id', headerName: 'Id', width: 300 },
    { field: 'fileName', headerName: 'File Name', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'errors', headerName: 'Error Log', width: 300 },
  ];

  useEffect(() => {
    const fetchContactFiles = async () => {
      const bearerToken = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/contacts/files`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      setContactFiles(response.data.files);
    };
    fetchContactFiles();
  }, []);

  return (
  <div style={{ background: 'white',height: 300 , width:"100%" }}>
    <DataGrid rows={contactFiles} columns={colums} />
  </div>
  );
};

export default ContactFilesTable;

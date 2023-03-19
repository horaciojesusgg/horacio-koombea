import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { width } from "@mui/system";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  creditCardLastFour: string;
  creditCardNetwork: string;
}

const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const colums = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'creditCardLastFour', headerName: 'Credit Card Last Four', width: 150 },
    { field: 'creditCardNetwork', headerName: 'Credit Card Network', width: 150 },
  ];
  useEffect(() => {
    const fetchContacts = async () => {
        const bearerToken = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/contacts`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });
      


      setContacts(response.data.contacts);
    };
    fetchContacts();
  }, []);

  return (
    <div style={{ background: 'white',height: 300 , width:"100%" }}>
      <DataGrid rows={contacts} columns={colums} />
    </div>
  );
};

export default ContactTable;

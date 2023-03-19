import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import { Tab, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  creditCardLastFour: string;
  creditCardNetwork: string;

}

interface ContactFiles {
    id: string;
    fileName: string;
    size: string;
  }

const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

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
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Credit Card Last Four</TableCell>
            <TableCell align="left">Credit Card Network</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">{row.creditCardLastFour}</TableCell>
              <TableCell align="left">{row.creditCardNetwork}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTable;

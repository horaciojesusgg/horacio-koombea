import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import { Tab, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';

interface ContactFiles {
  id: string;
  fileName: string;
  size: string;
  status: string;
  errors: string;

}

const ContactFilesTable: React.FC = () => {
  const [contactFiles, setContactFiles] = useState<ContactFiles[]>([]);

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">File Name</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Error Log</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {contactFiles.map((file) => (
            <TableRow
              key={file.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{file.id}</TableCell>
              <TableCell align="left">{file.fileName}</TableCell>
              <TableCell align="left">{file.size}</TableCell>
              <TableCell align="left">{file.status}</TableCell>
              <TableCell align="left">{ file.errors &&
                file.errors.split(';').map((error) => (
                  <div>                 
                    <span>{error}.</span>
                    <br></br>
                  </div>
                )) || <span>No Errors</span>
              }</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactFilesTable;

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

interface FileUploadProps {
    apiUrl: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ apiUrl }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const bearerToken = localStorage.getItem("token");

            try {
                await axios.post('http://localhost:3000/contacts/file', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${bearerToken}`,
                    },
                });
                console.log("File uploaded successfully!");
            } catch (error) {
                alert(error)
                console.error(error);
            }
        }
    };

    return (
        <div>
            <input accept=".csv" type="file" onChange={handleFileInput} />
            <Button onClick={handleFileUpload} variant="contained" component="label">
              Upload File
            </Button>
        </div>
    );
};

export default FileUpload;

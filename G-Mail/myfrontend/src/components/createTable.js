import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make an HTTP POST request to upload the file
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle the response
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;

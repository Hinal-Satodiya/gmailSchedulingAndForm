import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmailDetails() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !email || !subject || !text) {
      alert('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('to', email);
    formData.append('subject', subject);
    formData.append('text', text);

    try {
      const response = await axios.post('http://localhost:5000/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Email sent successfully: ' + response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject:</label>
              <input type="text" id="subject" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Body:</label>
              <textarea id="text" className="form-control" rows={10} value={text} onChange={(e) => setText(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">File:</label>
              <input type="file" id="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Send Email</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailDetails;

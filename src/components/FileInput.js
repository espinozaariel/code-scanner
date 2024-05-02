import React from 'react';

const FileInput = ({ onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file);
  };

  return (
    <input type="file" onChange={handleFileChange} />
  );
};

export default FileInput;
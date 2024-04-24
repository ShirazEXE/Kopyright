import React, { useState, useEffect } from 'react';
import '../pages_styles/CreatorDashboard.css';

const CreatorDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contentType, setContentType] = useState('');
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploadedContent, setUploadedContent] = useState([]);
  const [uploadedBy, setUploadedBy] = useState('');

  const fetchUploadedContent = async () => {
    try {
      const response = await fetch('/api/uploadHistory');
      const data = await response.json();
      setUploadedContent(data);
    } catch (error) {
      console.error('Error fetching upload history:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('file', file);
    formData.append('thumbnail', thumbnail);
    formData.append('contentType', contentType);
    formData.append('uploadedBy', uploadedBy);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading content');
      }

      const data = await response.json();
      console.log('Content uploaded successfully:', data);
      fetchUploadedContent();
    } catch (error) {
      console.error('Error uploading content:', error.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  useEffect(() => {
    fetchUploadedContent();
  }, []);

  return (
    <div className="creator-dashboard">
      <h1>Creator Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contentType">Content Type</label>
          <select
            className="form-control"
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="">Select Content Type</option>
            <option value="image/jpeg">Image</option>
            <option value="video/mp4">Video</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file">File</label>
          <input
            type="file"
            className="form-control-file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="file"
            className="form-control-file"
            id="thumbnail"
            onChange={handleThumbnailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="uploadedBy">Uploaded By</label>
          <input
            type="text"
            className="form-control"
            id="uploadedBy"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>

      <h2>Uploaded Content</h2>
      {uploadedContent.length > 0 ? (
        uploadedContent.map((content, index) => (
          <div key={index} className="content-item">
            <h3>{content.title}</h3>
            <p>{content.description}</p>
            <p>Price: ${content.price}</p>
            <p>Uploaded By: {content.uploadedBy}</p>
            <p>Uploaded At: {new Date(content.uploadedAt).toLocaleString()}</p>
            {content.contentType.startsWith('image') ? (
              <img src={`data:${content.contentType};base64,${content.fileBase64}`} alt="Thumbnail" />
            ) : (
              <video controls>
                <source src={`data:${content.contentType};base64,${content.fileBase64}`} type={content.contentType} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))
      ) : (
        <p>No content uploaded yet.</p>
      )}
    </div>
  );
};

export default CreatorDashboard;
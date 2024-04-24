import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marketplace = () => {
  const [marketplaceContent, setMarketplaceContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [placeholderContent, setPlaceholderContent] = useState([
    {
      title: 'Placeholder Content 1',
      description: 'This is a placeholder content item.',
      price: 9.99,
      thumbnail: 'https://via.placeholder.com/150',
      file: 'https://via.placeholder.com/150',
      uploaded_at: '2023-05-01T12:00:00.000Z',
    },
    {
      title: 'Placeholder Content 2',
      description: 'Another placeholder content item.',
      price: 14.99,
      thumbnail: 'https://via.placeholder.com/150',
      file: 'https://via.placeholder.com/150',
      uploaded_at: '2023-05-02T10:30:00.000Z',
    },
  ]);
  const [contentTypeFilter, setContentTypeFilter] = useState('');

  useEffect(() => {
    const fetchMarketplaceContent = async () => {
      try {
        const response = await axios.get('/api/marketplace');
        setMarketplaceContent(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching marketplace content:', error);
        setIsLoading(false);
      }
    };
    fetchMarketplaceContent();
  }, []);

  const handleContentTypeFilter = (e) => {
    setContentTypeFilter(e.target.value);
  };

  const filteredContent = contentTypeFilter
    ? marketplaceContent.filter((content) => content.contentType === contentTypeFilter)
    : marketplaceContent;

  return (
    <div>
      <h1>Marketplace</h1>
      <div>
        <label htmlFor="contentTypeFilter">Filter by Content Type:</label>
        <select id="contentTypeFilter" value={contentTypeFilter} onChange={handleContentTypeFilter}>
          <option value="">All</option>
          <option value="art">Art</option>
          <option value="music">Music</option>
          <option value="film">Film</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredContent.length === 0 ? (
        <div className="marketplace-content">
          {placeholderContent.map((content, index) => (
            <div key={index} className="content-card">
              <img src={content.thumbnail} alt={content.title} />
              <h3>{content.title}</h3>
              <p>{content.description}</p>
              <p>Price: ${content.price.toFixed(2)}</p>
              <p>Uploaded on: {new Date(content.uploaded_at).toLocaleString()}</p>
              <a href={content.file} target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="marketplace-content">
          {filteredContent.map((content, index) => (
            <div key={index} className="content-card">
              <img src={`/uploads/${content.thumbnail || 'placeholder.jpg'}`} alt={content.title} />
              <h3>{content.title}</h3>
              <p>{content.description}</p>
              <p>Price: ${content.price.toFixed(2)}</p>
              <p>Content Type: {content.contentType}</p>
              <p>Uploaded on: {new Date(content.uploaded_at).toLocaleString()}</p>
              <a href={`/uploads/${content.filename}`} target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
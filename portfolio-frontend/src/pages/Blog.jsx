import { useState, useEffect } from 'react';
import { blogAPI } from '../services/api';
import BlogPostCard from '../components/BlogPostCard';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogAPI.getAll();
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="blog-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="page-header">
        <h1>Blog</h1>
        <p>Thoughts, tutorials, and insights on web development</p>
      </div>

      {posts.length === 0 ? (
        <div className="no-content">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;

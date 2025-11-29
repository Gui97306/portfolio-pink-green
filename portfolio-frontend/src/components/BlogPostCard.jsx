import { Link } from 'react-router-dom';
import './BlogPostCard.css';

const BlogPostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-card">
      <div className="blog-card-header">
        <span className="blog-date">{formatDate(post.createdAt)}</span>
        <span className="blog-author">by {post.author?.username || 'Unknown'}</span>
      </div>
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">
        {post.content.length > 150
          ? `${post.content.substring(0, 150)}...`
          : post.content}
      </p>
      <Link to={`/blog/${post._id}`} className="read-more">
        Read More
      </Link>
    </div>
  );
};

export default BlogPostCard;

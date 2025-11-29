import { useState, useEffect } from 'react';
import { projectsAPI, blogAPI, contactAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: ''
  });
  const [editingProject, setEditingProject] = useState(null);

  // Blog state
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({ title: '', content: '' });
  const [editingPost, setEditingPost] = useState(null);

  // Messages state
  const [messages, setMessages] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'projects') {
        const res = await projectsAPI.getAll();
        setProjects(res.data);
      } else if (activeTab === 'blog') {
        const res = await blogAPI.getAll();
        setPosts(res.data);
      } else if (activeTab === 'messages') {
        const res = await contactAPI.getAll();
        setMessages(res.data);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  // Project handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectForm);
        showSuccess('Project updated successfully');
      } else {
        await projectsAPI.create(projectForm);
        showSuccess('Project created successfully');
      }
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProject(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || ''
    });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      showSuccess('Project deleted successfully');
      fetchData();
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  // Blog handlers
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, postForm);
        showSuccess('Post updated successfully');
      } else {
        await blogAPI.create(postForm);
        showSuccess('Post created successfully');
      }
      setPostForm({ title: '', content: '' });
      setEditingPost(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content
    });
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await blogAPI.delete(id);
      showSuccess('Post deleted successfully');
      fetchData();
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  // Message handlers
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactAPI.delete(id);
      showSuccess('Message deleted successfully');
      fetchData();
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.username}!</p>
      </div>

      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-success">{success}</div>}

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          Blog Posts
        </button>
        <button
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="tab-content">
                <form onSubmit={handleProjectSubmit} className="admin-form">
                  <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <textarea
                      placeholder="Project Description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      required
                      rows="3"
                    />
                  </div>
                  <div className="form-row three-col">
                    <input
                      type="url"
                      placeholder="Image URL (optional)"
                      value={projectForm.imageUrl}
                      onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                    />
                    <input
                      type="url"
                      placeholder="Repository URL (optional)"
                      value={projectForm.repoUrl}
                      onChange={(e) => setProjectForm({...projectForm, repoUrl: e.target.value})}
                    />
                    <input
                      type="url"
                      placeholder="Live URL (optional)"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                    {editingProject && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          setEditingProject(null);
                          setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <div className="items-list">
                  <h3>All Projects ({projects.length})</h3>
                  {projects.length === 0 ? (
                    <p className="no-items">No projects yet.</p>
                  ) : (
                    projects.map((project) => (
                      <div key={project._id} className="item-card">
                        <div className="item-info">
                          <h4>{project.title}</h4>
                          <p>{project.description.substring(0, 100)}...</p>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => handleEditProject(project)} className="btn-edit">Edit</button>
                          <button onClick={() => handleDeleteProject(project._id)} className="btn-delete">Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Blog Tab */}
            {activeTab === 'blog' && (
              <div className="tab-content">
                <form onSubmit={handlePostSubmit} className="admin-form">
                  <h3>{editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Post Title"
                      value={postForm.title}
                      onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <textarea
                      placeholder="Post Content"
                      value={postForm.content}
                      onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                      required
                      rows="6"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {editingPost ? 'Update Post' : 'Add Post'}
                    </button>
                    {editingPost && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          setEditingPost(null);
                          setPostForm({ title: '', content: '' });
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <div className="items-list">
                  <h3>All Blog Posts ({posts.length})</h3>
                  {posts.length === 0 ? (
                    <p className="no-items">No blog posts yet.</p>
                  ) : (
                    posts.map((post) => (
                      <div key={post._id} className="item-card">
                        <div className="item-info">
                          <h4>{post.title}</h4>
                          <p>{post.content.substring(0, 100)}...</p>
                          <span className="item-date">{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => handleEditPost(post)} className="btn-edit">Edit</button>
                          <button onClick={() => handleDeletePost(post._id)} className="btn-delete">Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="tab-content">
                <div className="items-list">
                  <h3>Contact Messages ({messages.length})</h3>
                  {messages.length === 0 ? (
                    <p className="no-items">No messages yet.</p>
                  ) : (
                    messages.map((message) => (
                      <div key={message._id} className="item-card message-card">
                        <div className="item-info">
                          <div className="message-header">
                            <h4>{message.name}</h4>
                            <span className="message-email">{message.email}</span>
                          </div>
                          <p>{message.message}</p>
                          <span className="item-date">{formatDate(message.createdAt)}</span>
                        </div>
                        <div className="item-actions">
                          <button onClick={() => handleDeleteMessage(message._id)} className="btn-delete">Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;

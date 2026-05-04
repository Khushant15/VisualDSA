import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  Code,
  TrendingUp,
  Zap,
  Search,
  ExternalLink,
} from "lucide-react";
import blogPostsData from "../data/blogPosts.json";
import "../styles/blog.css";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setBlogPosts(blogPostsData);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(
    () => ["All", "Theory", "Sorting", "Graphs", "Data Structures", "Search", "Optimization"],
    []
  );

  const filteredPosts = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      if (!matchesCategory) return false;
      
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });
  }, [blogPosts, selectedCategory, searchTerm]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <header className="blog-header">
        <div className="header-content">
          <h1 className="page-title">
            <BookOpen className="icon" />
            Algorithm Insights
          </h1>
          <p>Exploring the core concepts of computer science through theory and practice.</p>
          
          <div className="header-stats">
            <div className="stat">
              <span className="count">{blogPosts.length}</span>
              <span className="label">Articles</span>
            </div>
            <div className="stat">
              <span className="count">15+</span>
              <span className="label">Topics</span>
            </div>
          </div>
        </div>
      </header>

      <section className="featured-posts">
        <h2 className="section-title"><Zap size={20} /> Featured Stories</h2>
        <div className="featured-grid">
          {blogPosts.filter(p => p.featured).map(post => (
            <article key={post.id} className="featured-card">
              <div className="card-badge">Featured</div>
              <div className="meta">
                <span className="category">{post.category}</span>
                <span className="date"><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="card-footer">
                <span className="author"><User size={14} /> {post.author}</span>
                <Link to={post.link || "#"} className="read-more">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="search-filter-bar">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-list">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <main className="posts-grid">
        {filteredPosts.length === 0 ? (
          <div className="no-results">
            <h3>No articles found</h3>
            <p>Try a different search term or category.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <span className="category">{post.category}</span>
                <span className="date">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="tags">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <div className="post-footer">
                <span className="author">{post.author}</span>
                <Link to={post.link || "#"} className="link">
                  View <ExternalLink size={14} />
                </Link>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
};

export default Blog;

import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Hi, I'm <span className="highlight">Developer</span></h1>
          <p className="hero-subtitle">Full-Stack Web Developer</p>
          <p className="hero-description">
            I build beautiful, responsive, and user-friendly web applications.
            Passionate about creating seamless digital experiences with modern technologies.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate web developer with expertise in building modern web applications.
              I love working with React, Node.js, and MongoDB to create full-stack solutions
              that solve real-world problems.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or writing about web development on my blog.
            </p>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">HTML/CSS</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">REST API</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

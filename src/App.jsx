import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCode, FaServer, FaDatabase, FaTools, FaGraduationCap
} from 'react-icons/fa';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <img src="/images/AnkitImage.jpg" alt="Ankit Pal" className="nav-logo-img" />
            <span>Ankit Pal</span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="mobile-menu-btn">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <motion.div 
          className="hero-content"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div className="hero-text" variants={fadeInUp}>
            <h1>
              Hi, I'm <span className="gradient-text">Ankit Pal</span>
            </h1>
            <h2 className="gradient-text">MERN Stack Developer</h2>
            <p>
              Building scalable, high-performance web applications with React.js, Node.js, 
              Express.js, and MongoDB. Passionate about creating engaging UIs and secure, 
              optimized backends.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">
                Get In Touch <FaEnvelope />
              </a>
              <a href="#projects" className="btn btn-secondary">
                View Projects <FaCode />
              </a>
            </div>
          </motion.div>

          <motion.div className="hero-image" variants={fadeInUp}>
            <div className="profile-card">
              <img src="/images/AnkitImage.jpg" alt="Ankit Pal" className="profile-img" />
              <h3>Ankit Pal</h3>
              <p>MERN Stack Developer</p>
              <div className="social-links">
                <a href="https://github.com/AnkitPal2005" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/ankit-pal-971859280" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaLinkedin />
                </a>
                <a href="mailto:ap7032278@gmail.com" className="social-link">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <div className="about-content">
            <motion.div className="about-text" variants={fadeInUp}>
              <p>
                I'm a passionate MERN Stack Developer with hands-on experience in building 
                scalable, high-performance web applications. Currently pursuing BCA in Cloud 
                Technology & Information Security at Kurukshetra University with a CGPA of 8.67.
              </p>
              <p>
                My expertise lies in creating engaging user interfaces with React.js and 
                developing secure, optimized backends using Node.js, Express.js, and MongoDB. 
                I'm also equipped with Manual Testing knowledge, including test case creation, 
                bug tracking, and functional testing.
              </p>
              <p>
                I continuously upgrade my skills through internships and real-world projects, 
                always seeking to solve problems efficiently and deliver quality solutions.
              </p>
            </motion.div>
            <motion.div className="about-stats" variants={fadeInUp}>
              <div className="stat-card">
                <div className="stat-number">8.67</div>
                <div className="stat-label">CGPA</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2</div>
                <div className="stat-label">Internships</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section" style={{ background: 'var(--bg-gray)' }}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>
            My <span className="gradient-text">Skills</span>
          </motion.h2>
          <div className="skills-grid">
            <motion.div className="skill-category" variants={fadeInUp}>
              <h3><FaCode /> Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React.js</span>
              </div>
            </motion.div>

            <motion.div className="skill-category" variants={fadeInUp}>
              <h3><FaServer /> Backend</h3>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
              </div>
            </motion.div>

            <motion.div className="skill-category" variants={fadeInUp}>
              <h3><FaDatabase /> Database</h3>
              <div className="skill-tags">
                <span className="skill-tag">MongoDB</span>
              </div>
            </motion.div>

            <motion.div className="skill-category" variants={fadeInUp}>
              <h3><FaTools /> Tools & Others</h3>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">Manual Testing</span>
                <span className="skill-tag">Test Case Creation</span>
                <span className="skill-tag">Bug Tracking</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <div className="projects-grid">
            <motion.div className="project-card" variants={fadeInUp}>
              <div className="project-header">
                <h3>Text Editor</h3>
              </div>
              <div className="project-body">
                <p>
                  Full-featured Rich Text Editor with real-time editing, formatting capabilities 
                  (bold, italic, underline, headings, lists, image insertion), and secure storage.
                </p>
                <div className="project-tech">
                  <span className="tech-badge">React.js</span>
                  <span className="tech-badge">Node.js</span>
                  <span className="tech-badge">Express.js</span>
                  <span className="tech-badge">MongoDB</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/AnkitPal2005/Text-Editor" target="_blank" rel="noopener noreferrer" className="project-link github">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div className="project-card" variants={fadeInUp}>
              <div className="project-header">
                <h3>Schedule-Sync</h3>
              </div>
              <div className="project-body">
                <p>
                  Web-based timetable management system with leave approval workflow, 
                  conflict-free class scheduling, and role-based access control.
                </p>
                <div className="project-tech">
                  <span className="tech-badge">HTML</span>
                  <span className="tech-badge">CSS</span>
                  <span className="tech-badge">JavaScript</span>
                  <span className="tech-badge">Node.js</span>
                  <span className="tech-badge">Express.js</span>
                  <span className="tech-badge">MongoDB</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/AnkitPal2005/time-table-mng" target="_blank" rel="noopener noreferrer" className="project-link github">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div className="project-card" variants={fadeInUp}>
              <div className="project-header">
                <h3>TodoList MERN</h3>
              </div>
              <div className="project-body">
                <p>
                  Full-stack Todo List application built with MERN stack featuring task management, 
                  CRUD operations, user authentication, and real-time updates with a modern UI.
                </p>
                <div className="project-tech">
                  <span className="tech-badge">React.js</span>
                  <span className="tech-badge">Node.js</span>
                  <span className="tech-badge">Express.js</span>
                  <span className="tech-badge">MongoDB</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/AnkitPal2005/TodoList_Mern" target="_blank" rel="noopener noreferrer" className="project-link github">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section" style={{ background: 'var(--bg-gray)' }}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <div className="timeline">
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-header">
                <div>
                  <div className="timeline-title">Web Development Intern</div>
                  <div className="timeline-company">CodeQuotient - Industrial Training</div>
                </div>
                <div className="timeline-date">Jul 2025 - Sep 2025</div>
              </div>
              <div className="timeline-content">
                <ul>
                  <li>Developed dynamic web applications using Express.js & MongoDB</li>
                  <li>Implemented UI improvements & responsive development</li>
                  <li>Built backend API development solutions</li>
                  <li>Solved real-world problems through practical implementations</li>
                </ul>
              </div>
            </motion.div>

            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-header">
                <div>
                  <div className="timeline-title">Summer Training</div>
                  <div className="timeline-company">CodeQuotient</div>
                </div>
                <div className="timeline-date">Jul 2024 - Aug 2024</div>
              </div>
              <div className="timeline-content">
                <ul>
                  <li>Focused on core frontend development (HTML, CSS, JavaScript)</li>
                  <li>Built mini projects including Stopwatch & Online Code Compiler</li>
                  <li>Enhanced problem-solving skills & programming fundamentals</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>
            <span className="gradient-text">Education</span>
          </motion.h2>
          <div className="education-grid">
            <motion.div className="education-card" variants={fadeInUp}>
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-info">
                <h3>BCA – Cloud Technology & Information Security</h3>
                <div className="education-school">Kurukshetra University</div>
                <div className="education-year">2023 – Present</div>
              </div>
              <div className="education-grade">8.67 CGPA</div>
            </motion.div>

            <motion.div className="education-card" variants={fadeInUp}>
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-info">
                <h3>Senior Secondary (Non-Medical)</h3>
                <div className="education-school">Govt Model Sanskriti Sr Sec School, Chhachhrauli</div>
                <div className="education-year">2022 – 2023</div>
              </div>
              <div className="education-grade">60%</div>
            </motion.div>

            <motion.div className="education-card" variants={fadeInUp}>
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-info">
                <h3>Secondary Education</h3>
                <div className="education-school">Guru Nanak Public School, Chhachhrauli</div>
                <div className="education-year">2020 – 2021</div>
              </div>
              <div className="education-grade">93%</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ background: 'var(--bg-gray)' }}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.div className="contact-content" variants={fadeInUp}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <h3>Email</h3>
                <a href="mailto:ap7032278@gmail.com">ap7032278@gmail.com</a>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <h3>Phone</h3>
                <a href="tel:+918818065531">+91 8818065531</a>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>Location</h3>
                <p>Yamunanagar, Haryana, India</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://github.com/AnkitPal2005" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/ankit-pal-971859280" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin />
          </a>
          <a href="mailto:ap7032278@gmail.com" className="social-link">
            <FaEnvelope />
          </a>
        </div>
        <p>© 2024 Ankit Pal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

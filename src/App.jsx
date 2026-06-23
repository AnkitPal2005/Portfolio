import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCode, FaServer, FaDatabase, FaTools, FaGraduationCap,
  FaDownload, FaCopy, FaCheck, FaBriefcase, FaExternalLinkAlt
} from 'react-icons/fa';
import './App.css';

// 1. High Performance Particle Canvas Background
function CanvasParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 65;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.4 + 0.15
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 0.6;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundaries bounce
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 100) * 0.12})`;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

// 2. Interactive Count-Up Animation Component for Stats
function StatCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp = null;
    const target = parseFloat(value);
    const isFloat = value.includes('.');

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const current = progress * target;
      
      setCount(isFloat ? current.toFixed(2) : Math.floor(current));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// 3. 3D Tilt Hover Effect Card Component
function ProjectCard({ project }) {
  const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Soft tilt angles (max 8 degrees)
    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
  };

  return (
    <motion.div 
      layout
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="project-header-bar">
        <div className="project-icon-box">
          <FaCode />
        </div>
        <div className="project-links">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-link-icon" 
            title="View Code on GitHub"
            aria-label="GitHub Repository"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="project-info-box">
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-features-title">Core Highlights</div>
        <ul className="project-features-list">
          {project.features.map((feat, fIdx) => (
            <li key={fIdx}>{feat}</li>
          ))}
        </ul>

        <div className="project-tech-tags">
          {project.tech.map((tag, tIdx) => (
            <span key={tIdx} className="project-tech-badge">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  // Scroll tracking for Top Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // Watch Scroll for Navbar Glow & Scroll Spy highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll Spy Logic
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 240;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Clipboard Copier helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(label);
      setToastMessage(`Copied ${label} to clipboard!`);
      setTimeout(() => {
        setCopiedField('');
        setToastMessage('');
      }, 3000);
    });
  };

  // Stagger configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  // Profile data definitions
  const profile = {
    name: 'Ankit Pal',
    title: 'Software Engineer | Full Stack Developer',
    role: 'Software Engineer @ WottaCore Digital Solutions',
    tagline: 'ASP.NET Core • Angular • React • Node.js',
    about: 'I am a Full Stack Developer currently working as a Software Engineer at WottaCore Digital Solutions. I have hands-on experience in building scalable web applications using ASP.NET Core, Angular, React, Node.js, SQL Server, PostgreSQL and MongoDB.',
    aboutDetails: 'My experience includes frontend development, backend API development, database design, authentication systems, bug fixing, manual testing and working on production-level applications. I enjoy solving real-world problems and continuously improving my software engineering skills through practical development and real-world projects.',
    email: 'ap70232789@gmail.com',
    phone: '+918818065531',
    location: 'Yamunanagar, Haryana, India',
    github: 'https://github.com/AnkitPal2005',
    linkedin: 'https://www.linkedin.com/in/ankit-pal-971859280'
  };

  const skillsData = [
    {
      category: 'Frontend Development',
      icon: <FaCode style={{ color: '#06b6d4' }} />,
      skills: ['Angular', 'React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery', 'Razor Views']
    },
    {
      category: 'Backend Architecture',
      icon: <FaServer style={{ color: '#8b5cf6' }} />,
      skills: ['ASP.NET Core MVC', 'ASP.NET Core Web API', 'C#', 'Node.js', 'Express.js']
    },
    {
      category: 'Database Systems & ORM',
      icon: <FaDatabase style={{ color: '#10b981' }} />,
      skills: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Dapper']
    },
    {
      category: 'Authentication & Development Tools',
      icon: <FaTools style={{ color: '#3b82f6' }} />,
      skills: ['ASP.NET Core Identity', 'JWT Authentication', 'Role-Based Authorization', 'Git', 'GitHub', 'Manual Testing', 'Bug Tracking', 'REST APIs', 'API Development']
    }
  ];

  const projectsData = [
    {
      id: 1,
      title: 'School Management System',
      description: 'Educational ERP system designed for managing academic workflows, secure user operations, and graphical report compilation.',
      tech: ['ASP.NET Core MVC', 'Dapper', 'SQL Server', 'Identity', 'Bootstrap', 'jQuery'],
      features: ['Role-Based Authentication', 'Admin, Teacher, and Student Modules', 'Attendance Management', 'Notes Management', 'Dashboard and Reports', 'PDF Generation'],
      category: 'ASP.NET Core',
      github: 'https://github.com/AnkitPal2005'
    },
    {
      id: 2,
      title: 'Teacher Management System',
      description: 'Administration manager supporting secure operations, filters, data checking, and optimized data persistence.',
      tech: ['ASP.NET Core MVC', 'Dapper', 'SQL Server'],
      features: ['CRUD Operations', 'Validation', 'Search and Filtering', 'Responsive UI'],
      category: 'ASP.NET Core',
      github: 'https://github.com/AnkitPal2005'
    },
    {
      id: 3,
      title: 'Resume Builder',
      description: 'A responsive layout designer which exports formatted templates based on dynamic user entries.',
      tech: ['ASP.NET Core MVC', 'SQL Server', 'jQuery'],
      features: ['Dynamic Resume Creation', 'Template Based Design', 'PDF Export'],
      category: 'ASP.NET Core',
      github: 'https://github.com/AnkitPal2005'
    },
    {
      id: 4,
      title: 'Text Editor',
      description: 'A cloud-enabled rich word processor providing client formatting options and secure persistent database storage.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      features: ['Rich Text Editing', 'Formatting Tools', 'Secure Data Storage'],
      category: 'React / Node',
      github: 'https://github.com/AnkitPal2005/Text-Editor'
    },
    {
      id: 5,
      title: 'Schedule Sync',
      description: 'Conflict-free staff timetable manager integrating calendar views and employee leave logs.',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
      features: ['Timetable Management', 'Leave Approval Workflow', 'Role-Based Access Control'],
      category: 'React / Node',
      github: 'https://github.com/AnkitPal2005/time-table-mng'
    }
  ];

  const experienceData = [
    {
      role: 'Software Engineer | Full Stack Developer',
      company: 'WottaCore Digital Solutions',
      period: 'Mar 2026 - Present',
      tasks: [
        'Architecting and developing enterprise-grade web applications with ASP.NET Core and Angular.',
        'Designing secure REST APIs, role-based authentication systems, and database schemas.',
        'Optimizing SQL Server & PostgreSQL queries for high-performance production workloads.',
        'Collaborating with cross-functional product and dev teams to ship features using Agile methodologies.'
      ]
    },
    {
      role: 'Software Developer Intern',
      company: 'WottaCore Digital Solutions',
      period: 'Jan 2026 - Mar 2026',
      tasks: [
        'Developed Angular applications and components for dynamic user portals.',
        'Worked on ASP.NET Core backend services and database designs.',
        'API integration, feature enhancements, and manual testing on production applications.',
        'Collaborated with development teams on production release builds.'
      ]
    },
    {
      role: 'Trainee',
      company: 'CodeQuotient Industrial Training',
      period: 'Jul 2025 – Sep 2025',
      tasks: [
        'Built full-stack web applications utilizing Node.js, Express.js, and MongoDB.',
        'Developed responsive user interfaces and robust REST APIs.',
        'Strengthened problem-solving skills under sprint schedules.'
      ]
    },
    {
      role: 'Summer Training',
      company: 'CodeQuotient',
      period: 'Jul 2024 - Aug 2024',
      tasks: [
        'Focused on core frontend development technologies including HTML5, CSS3, and JavaScript ES6+.',
        'Built mini projects including Stopwatch and Online Code Compiler demonstrating practical skills.',
        'Enhanced problem-solving abilities and strengthened programming fundamentals.'
      ]
    }
  ];

  const educationData = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      field: 'Cloud Technology & Information Security',
      institution: 'Kurukshetra University',
      period: '2023 – Present',
      grade: '8.67 CGPA'
    },
    {
      degree: 'Senior Secondary (Non-Medical)',
      field: 'Science curriculum (PCM)',
      institution: 'Govt Model Sanskriti Sr Sec School, Chhachhrauli',
      period: '2022 – 2023',
      grade: '60%'
    },
    {
      degree: 'Secondary Education',
      field: 'Standard General Studies',
      institution: 'Guru Nanak Public School, Chhachhrauli',
      period: '2020 – 2021',
      grade: '93%'
    }
  ];

  const filteredProjects = projectFilter === 'All' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === projectFilter);

  return (
    <div className="app">
      {/* 1. HTML5 Canvas Particles Visualizer */}
      <CanvasParticles />

      {/* 2. Scroll Progress Bar at the top */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="nav-logo" aria-label="Ankit Pal Logo">
            <div className="nav-logo-circle">AP</div>
            <span className="nav-logo-text">Ankit Pal</span>
          </a>
          
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={closeMobileMenu}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={closeMobileMenu}>About</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={closeMobileMenu}>Skills</a></li>
            <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={closeMobileMenu}>Experience</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={closeMobileMenu}>Projects</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={closeMobileMenu}>Contact</a></li>
          </ul>

          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle Navigation Menu"
          >
            <span style={{ fontSize: '1.75rem' }}>{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-grid">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="hero-left"
          >
            <motion.div variants={fadeInUp} className="hero-tagline-badge">
              <span className="hero-tagline-dot" />
              <span>{profile.role}</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="hero-title">
              Hi, I'm <span className="name">{profile.name}</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="hero-subtitle">
              <span>{profile.title}</span>
            </motion.div>

            <motion.p variants={fadeInUp} className="hero-description">
              Full Stack Developer specializing in building enterprise backend APIs and responsive user interfaces. 
              Experienced in <strong style={{ color: '#fff' }}>ASP.NET Core, Angular, React, and Node.js</strong>.
            </motion.p>

            <motion.div variants={fadeInUp} className="hero-cta">
              <a 
                href="/resume/Ankit_Pal_Resume.pdf"
                download="Ankit_Pal_Resume.pdf"
                className="btn btn-primary"
                onClick={() => {
                  setToastMessage("Downloading Resume PDF...");
                  setTimeout(() => setToastMessage(''), 3000);
                }}
              >
                Download Resume <FaDownload />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me <FaEnvelope />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-card-container"
          >
            <div className="premium-card">
              <div className="card-image-wrap animate-float">
                <img 
                  src="/images/AnkitImage.jpg" 
                  alt={profile.name} 
                  className="card-image" 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>
              <div className="card-info">
                <h3>{profile.name}</h3>
                <p>Software Engineer @ WottaCore Digital Solutions</p>
                <span className="card-tagline">{profile.tagline}</span>
              </div>
              <div className="card-socials">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="card-social-btn" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="card-social-btn" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href={`mailto:${profile.email}`} className="card-social-btn" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-header">
          <span className="section-subtitle">Profile Details</span>
          <h2 className="section-title">About <span className="gradient-title">Me</span></h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>{profile.about}</p>
            <p>{profile.aboutDetails}</p>
            
            <div style={{ marginTop: '1rem' }}>
              <a href="#contact" className="btn btn-secondary">
                Get Contact Details <FaPhone />
              </a>
            </div>
          </div>

          <div className="about-stats">
            <div className="about-stat-card">
              <div className="about-stat-num">
                <StatCounter value="8.67" />
              </div>
              <div className="about-stat-label">BCA CGPA</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">
                <StatCounter value="5" />
              </div>
              <div className="about-stat-label">Featured Projects</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">
                <StatCounter value="2" />
              </div>
              <div className="about-stat-label">Roles Completed</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">
                <StatCounter value="100" />%
              </div>
              <div className="about-stat-label">Production Devoted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="section-header">
          <span className="section-subtitle">Capabilities</span>
          <h2 className="section-title">Technical <span className="gradient-title">Skills</span></h2>
        </div>

        <div className="skills-container">
          <div className="skills-grid">
            {skillsData.map((cat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="skill-card"
              >
                <div className="skill-card-header">
                  <div className="skill-card-icon">
                    {cat.icon}
                  </div>
                  <h3>{cat.category}</h3>
                </div>
                <div className="skill-items-list">
                  {cat.skills.map((skill, skIdx) => (
                    <span key={skIdx} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education Timelines */}
      <section id="experience" className="section">
        <div className="timeline-section-grid">
          {/* Work Experience */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <h3 className="timeline-column-title">
              <FaBriefcase style={{ color: '#8b5cf6' }} /> Experience
            </h3>
            <div className="timeline-wrapper">
              <div className="timeline-glow-line" />
              {experienceData.map((exp, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-dot" />
                  <span className="timeline-date-pill">{exp.period}</span>
                  <div className="timeline-content-card">
                    <h4 className="timeline-role">{exp.role}</h4>
                    <div className="timeline-org">{exp.company}</div>
                    <ul className="timeline-desc-list">
                      {exp.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <h3 className="timeline-column-title">
              <FaGraduationCap style={{ color: '#06b6d4' }} /> Education
            </h3>
            <div className="timeline-wrapper">
              <div className="timeline-glow-line" style={{ background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-emerald))' }} />
              {educationData.map((edu, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-dot" />
                  <span className="timeline-date-pill">{edu.period}</span>
                  <div className="timeline-content-card">
                    <h4 className="timeline-role">{edu.degree}</h4>
                    <div className="timeline-org">{edu.institution}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.field}</p>
                    <span className="timeline-grade">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="section-header">
          <span className="section-subtitle">Showcase</span>
          <h2 className="section-title">Featured <span className="gradient-title">Projects</span></h2>
        </div>

        <div className="projects-container">
          <div className="projects-filter-bar">
            {['All', 'ASP.NET Core', 'React / Node'].map((filter) => (
              <button
                key={filter}
                className={`skills-tab-btn ${projectFilter === filter ? 'active' : ''}`}
                onClick={() => setProjectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div layout className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="section-header">
          <span className="section-subtitle">Say Hello</span>
          <h2 className="section-title">Connect with <span className="gradient-title">Me</span></h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info-cards">
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <FaEnvelope />
              </div>
              <div className="contact-card-details">
                <h4>Email Address</h4>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <FaPhone />
              </div>
              <div className="contact-card-details">
                <h4>Phone Call</h4>
                <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-card-details">
                <h4>Current Base</h4>
                <p>{profile.location}</p>
              </div>
            </div>
          </div>

          <div className="contact-action-pane">
            <div className="contact-pane-header">
              <h3>Direct Recruitment Actions</h3>
              <p>One-click actions to download resume or copy contact details.</p>
            </div>
            
            <div className="contact-quick-buttons">
              <div className="contact-interactive-row">
                <div className="contact-label-pair">
                  <span className="lbl">Hiring Manager Email</span>
                  <span className="val">{profile.email}</span>
                </div>
                <button 
                  className={`copy-btn ${copiedField === 'Email' ? 'copied' : ''}`}
                  onClick={() => handleCopy(profile.email, 'Email')}
                  title="Copy Email Address"
                  aria-label="Copy Email"
                >
                  {copiedField === 'Email' ? <FaCheck /> : <FaCopy />}
                </button>
              </div>

              <div className="contact-interactive-row">
                <div className="contact-label-pair">
                  <span className="lbl">Contact Number</span>
                  <span className="val">{profile.phone}</span>
                </div>
                <button 
                  className={`copy-btn ${copiedField === 'Phone' ? 'copied' : ''}`}
                  onClick={() => handleCopy(profile.phone, 'Phone')}
                  title="Copy Phone Number"
                  aria-label="Copy Phone"
                >
                  {copiedField === 'Phone' ? <FaCheck /> : <FaCopy />}
                </button>
              </div>

              <div style={{ marginTop: '0.75rem', width: '100%' }}>
                <a 
                  href="/resume/Ankit_Pal_Resume.pdf"
                  download="Ankit_Pal_Resume.pdf"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setToastMessage("Downloading Resume PDF...");
                    setTimeout(() => setToastMessage(''), 3000);
                  }}
                >
                  Download CV / Resume <FaDownload />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating toast notification */}
      {toastMessage && (
        <div className="toast-alert animate-fadeIn">
          <FaCheck style={{ color: '#10b981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="card-social-btn" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="card-social-btn" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={`mailto:${profile.email}`} className="card-social-btn" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <p>© {new Date().getFullYear()} Ankit Pal. Engineered with React & Passion.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

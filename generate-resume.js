import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

// Ensure the public/resume directory exists
const resumeDir = path.join(process.cwd(), 'public', 'resume');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const outputPath = path.join(resumeDir, 'Ankit_Pal_Resume.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: {
    top: 0,
    bottom: 40,
    left: 40,
    right: 40
  }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Premium Color Scheme (matching the modern dark/neon portfolio)
const primaryColor = '#0f172a';    // Deep Navy
const secondaryColor = '#3b82f6';  // Neon Blue
const accentColor = '#8b5cf6';     // Purple Accent
const textColor = '#334155';       // Charcoal Slate
const textMuted = '#64748b';        // Cool Grey
const cardBg = '#f8fafc';          // Premium Off-white/slate
const cardBorder = '#e2e8f0';      // Border Light

// Draw Gradient Banner on Page 1
const grad = doc.linearGradient(0, 0, 595.28, 0);
grad.stop(0, '#1e3a8a')   // Deep Blue
    .stop(0.5, '#3b82f6') // Accent Blue
    .stop(1, '#7c3aed');  // Purple
doc.rect(0, 0, 595.28, 145).fill(grad);

// Banner Title & Info
doc.fillColor('#ffffff')
   .font('Helvetica-Bold')
   .fontSize(25)
   .text('ANKIT PAL', 0, 24, { align: 'center' });

doc.fillColor('#cbd5e1')
   .font('Helvetica-Bold')
   .fontSize(11.5)
   .text('SOFTWARE ENGINEER | FULL STACK DEVELOPER', { align: 'center', spaceBefore: 4, spaceAfter: 8 });

doc.fillColor('#ffffff')
   .font('Helvetica')
   .fontSize(9)
   .text('Email: ap70232789@gmail.com   |   Phone: +91 8818065531   |   Location: Yamunanagar, Haryana', { align: 'center', spaceAfter: 4 })
   .text('GitHub: github.com/AnkitPal2005   |   LinkedIn: linkedin.com/in/ankit-pal-971859280', { align: 'center', spaceAfter: 4 })
   .text('Portfolio: https://ankitpal-portfolio.netlify.app', { align: 'center' });

let y = 165;

// Helper: Custom Section Divider with Gradient Look
function drawSectionHeader(title, currentY, color = '#1e3a8a') {
  doc.fillColor(color)
     .font('Helvetica-Bold')
     .fontSize(11.5)
     .text(title, 40, currentY);

  // Decorative double line/accent strip
  doc.strokeColor(secondaryColor)
     .lineWidth(2.5)
     .moveTo(40, currentY + 16)
     .lineTo(120, currentY + 16)
     .stroke();

  doc.strokeColor('#e2e8f0')
     .lineWidth(1)
     .moveTo(120, currentY + 16)
     .lineTo(555, currentY + 16)
     .stroke();

  return currentY + 26;
}

// 1. Summary
y = drawSectionHeader('PROFESSIONAL SUMMARY', y);
doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .text(
     'Detail-oriented Software Engineer & Full Stack Developer currently working as a Software Developer Intern at WottaCore Digital Solutions. ' +
     'Experienced in building scalable web applications using ASP.NET Core, Angular, React, and Node.js. Skilled in frontend ' +
     'development, backend API development, database design, authentication systems, bug fixing, manual testing and production ' +
     'application maintenance. Enjoys solving real-world challenges through clean engineering.',
     40, y, { align: 'justify', lineGap: 2 }
   );

y += 72;

// 2. Technical Skills (Elegant Grid Layout)
y = drawSectionHeader('TECHNICAL SKILLS', y);

const col1X = 40;
const col2X = 300;
let skillY = y;

// Column 1
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text('Programming Languages', col1X, skillY);
doc.fillColor(textColor).font('Helvetica').fontSize(9).text('C/C++, JavaScript, TypeScript', col1X, skillY + 13);

doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text('Frontend Development', col1X, skillY + 40);
doc.fillColor(textColor).font('Helvetica').fontSize(9).text('Angular, React.js, HTML5, CSS3, Bootstrap, jQuery, Razor Views', col1X, skillY + 53, { width: 240, lineGap: 1 });

doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text('Other Skills', col1X, skillY + 92);
doc.fillColor(textColor).font('Helvetica').fontSize(9).text('Manual Testing, Test Case Creation, Bug Tracking, REST APIs, API Development', col1X, skillY + 105, { width: 240, lineGap: 1 });

// Column 2
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text('Backend Development', col2X, skillY);
doc.fillColor(textColor).font('Helvetica').fontSize(9).text('C#, .NET, ASP.NET Core MVC, ASP.NET Core Web API, Node.js, Express.js', col2X, skillY + 13, { width: 250, lineGap: 1 });

doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text('Database & Tools', col2X, skillY + 53);
doc.fillColor(textColor).font('Helvetica').fontSize(9).text('SQL Server, PostgreSQL, MongoDB, Dapper, Git, GitHub, VS Code', col2X, skillY + 66, { width: 250, lineGap: 1 });

y += 155;

// 3. Projects (Page 1)
y = drawSectionHeader('PROJECTS', y);

function drawCardBox(title, rightText, techText, desc, currentY, height) {
  // Background gray fill with rounded borders
  doc.roundedRect(40, currentY, 515, height, 6)
     .fill(cardBg);

  // Border outlining card
  doc.roundedRect(40, currentY, 515, height, 6)
     .strokeColor(cardBorder)
     .lineWidth(0.8)
     .stroke();

  // Left vertical blue accent line
  doc.strokeColor(secondaryColor)
     .lineWidth(3)
     .moveTo(40.5, currentY + 3)
     .lineTo(40.5, currentY + height - 3)
     .stroke();

  // Content
  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(title, 50, currentY + 7);

  if (rightText) {
    doc.fillColor(secondaryColor)
       .font('Helvetica-Bold')
       .fontSize(8)
       .text(rightText, 50, currentY + 7, { align: 'right', width: 490 });
  }

  doc.fillColor(textColor)
     .font('Helvetica')
     .fontSize(8.5)
     .text(desc, 50, currentY + 19, { width: 490, lineGap: 0.5 });

  doc.fillColor(textMuted)
     .font('Helvetica-Oblique')
     .fontSize(8)
     .text(`Tech Stack: ${techText}`, 50, currentY + height - 12);

  return currentY + height + 6;
}

// Draw all 5 projects
y = drawCardBox(
  'School Management System',
  'github.com/AnkitPal2005',
  'ASP.NET Core MVC, Dapper, SQL Server, Identity, Bootstrap, jQuery',
  'Academic portal with Role-Based Authentication (Admin, Teacher, Student modules), attendance trackers, notes management dashboards, and automated PDF reports compilation.',
  y,
  55
);

y = drawCardBox(
  'Teacher Management System',
  'github.com/AnkitPal2005',
  'ASP.NET Core MVC, Dapper, SQL Server',
  'Administrative manager with staff profile CRUD operations, validation filters, multi-column search, and responsive layout.',
  y,
  55
);

y = drawCardBox(
  'Resume Builder',
  'github.com/AnkitPal2005',
  'ASP.NET Core MVC, SQL Server, jQuery',
  'Professional resume builder that exports formatted templates based on dynamic user entries and custom template selections.',
  y,
  55
);

y = drawCardBox(
  'Text Editor',
  'github.com/AnkitPal2005/Text-Editor',
  'React.js, Node.js, Express.js, MongoDB',
  'Full-featured Rich Text Editor with real-time editing capabilities, comprehensive formatting options (bold, italic, underline, headings, lists, image insertion), and secure storage implementation.',
  y,
  55
);

y = drawCardBox(
  'Schedule Sync',
  'github.com/AnkitPal2005/time-table-mng',
  'Node.js, Express.js, MongoDB, JavaScript',
  'Web-based timetable management system featuring leave approval workflow, conflict-free class scheduling algorithm, and role-based access control for efficient academic administration.',
  y,
  55
);


// ----------------------------------------------------
// Page 2 Layout
// ----------------------------------------------------
doc.addPage({
  size: 'A4',
  margins: {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40
  }
});

y = 40;

// 4. Professional Experience
y = drawSectionHeader('PROFESSIONAL EXPERIENCE', y, '#7c3aed'); // Purple banner accent

function drawExperienceBox(title, dates, org, points, currentY) {
  const height = 36 + points.length * 14;
  
  doc.roundedRect(40, currentY, 515, height, 6)
     .fill(cardBg);

  doc.roundedRect(40, currentY, 515, height, 6)
     .strokeColor(cardBorder)
     .lineWidth(0.8)
     .stroke();

  doc.strokeColor(accentColor)
     .lineWidth(3)
     .moveTo(40.5, currentY + 3)
     .lineTo(40.5, currentY + height - 3)
     .stroke();

  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(title, 50, currentY + 8);

  doc.fillColor(textMuted)
     .font('Helvetica')
     .fontSize(8.5)
     .text(dates, 50, currentY + 8, { align: 'right', width: 490 });

  doc.fillColor(accentColor)
     .font('Helvetica-Bold')
     .fontSize(9)
     .text(org, 50, currentY + 21);

  let pointY = currentY + 34;
  points.forEach(pt => {
    doc.fillColor(textColor)
       .font('Helvetica')
       .fontSize(8.5)
       .text('•  ', 54, pointY, { continued: true })
       .text(pt, 62, pointY, { width: 480, lineGap: 1 });
    pointY += 13.5;
  });

  return currentY + height + 8;
}

y = drawExperienceBox(
  'Software Engineer | Full Stack Developer',
  'March 2026 - Present',
  'WottaCore Digital Solutions',
  [
    'Architecting and developing enterprise-grade web applications with ASP.NET Core and Angular.',
    'Designing secure REST APIs, role-based authentication systems, and database schemas.',
    'Optimizing SQL Server & PostgreSQL queries for high-performance production workloads.',
    'Collaborating with cross-functional product and dev teams to ship features using Agile methodologies.'
  ],
  y
);

y = drawExperienceBox(
  'Software Developer Intern',
  'January 2026 - March 2026',
  'WottaCore Digital Solutions',
  [
    'Developed Angular applications and components for dynamic user portals.',
    'Worked on ASP.NET Core backend services and database designs.',
    'API integration, feature enhancements, and manual testing on production applications.',
    'Collaborated with development teams on production release builds.'
  ],
  y
);

y = drawExperienceBox(
  'Web Development Intern',
  'July 2025 - September 2025',
  'CodeQuotient - Industrial Training',
  [
    'Developed dynamic web applications using Express.js and MongoDB with focus on scalability and performance.',
    'Implemented UI improvements and responsive design principles for enhanced user experience.',
    'Built robust backend API solutions with RESTful architecture and proper error handling.',
    'Solved real-world problems through practical implementations and collaborative development.'
  ],
  y
);

y = drawExperienceBox(
  'Summer Training',
  'July 2024 - August 2024',
  'CodeQuotient',
  [
    'Focused on core frontend development technologies including HTML5, CSS3, and JavaScript ES6+.',
    'Built mini projects including Stopwatch and Online Code Compiler demonstrating practical skills.',
    'Enhanced problem-solving abilities and strengthened programming fundamentals.'
  ],
  y
);

y += 6;

// 5. Education
y = drawSectionHeader('EDUCATION', y);

function drawEducationBox(degree, fieldOrg, dates, grade, currentY) {
  doc.roundedRect(40, currentY, 515, 58, 6)
     .fill(cardBg);

  doc.roundedRect(40, currentY, 515, 58, 6)
     .strokeColor(cardBorder)
     .lineWidth(0.8)
     .stroke();

  doc.strokeColor(secondaryColor)
     .lineWidth(3)
     .moveTo(40.5, currentY + 3)
     .lineTo(40.5, currentY + 55)
     .stroke();

  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(degree, 50, currentY + 8);

  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(10.5)
     .text(grade, 50, currentY + 8, { align: 'right', width: 490 });

  doc.fillColor(textColor)
     .font('Helvetica')
     .fontSize(8.5)
     .text(fieldOrg, 50, currentY + 21);

  doc.fillColor(textMuted)
     .font('Helvetica')
     .fontSize(8)
     .text(dates, 50, currentY + 41);

  return currentY + 66;
}

y = drawEducationBox(
  'Bachelor of Computer Applications (BCA)',
  'Cloud Technology & Information Security | Kurukshetra University',
  '2023 - Present',
  'CGPA: 8.67',
  y
);

y = drawEducationBox(
  'Senior Secondary (Non-Medical)',
  'Govt Model Sanskriti Sr Sec School, Chhachhrauli',
  '2022 - 2023',
  '60%',
  y
);

y = drawEducationBox(
  'Secondary Education',
  'Guru Nanak Public School, Chhachhrauli',
  '2020 - 2021',
  '93%',
  y
);

y += 6;

// 6. Additional Information
y = drawSectionHeader('ADDITIONAL INFORMATION', y, '#7c3aed');

let addY = y;
// Column 1
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text('Certifications & Training', col1X, addY);
doc.fillColor(textColor).font('Helvetica').fontSize(8.5)
   .text('• Industrial Training - Web Development (CodeQuotient)', col1X, addY + 15, { lineGap: 2.5 })
   .text('• Summer Training - Frontend Development (CodeQuotient)', col1X, addY + 29, { lineGap: 2.5 });

// Column 2
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text('Languages', col2X, addY);
doc.fillColor(textColor).font('Helvetica').fontSize(8.5)
   .text('• English - Professional Working Proficiency', col2X, addY + 15, { lineGap: 2.5 })
   .text('• Hindi - Native/Bilingual Proficiency', col2X, addY + 29, { lineGap: 2.5 });

doc.end();

writeStream.on('finish', () => {
  console.log('Successfully compiled two-page custom resume layout.');
});

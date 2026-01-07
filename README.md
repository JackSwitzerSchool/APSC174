# Linear Algebra Learning Platform

An interactive website for teaching linear algebra fundamentals, created to support TA tutorials for APSC 174 / MATH 111 at Queen's University.

🔗 **Live Site:** [linalg.jackswitzer.com](https://linalg.jackswitzer.com)

## Overview

This platform serves as a centralized hub for course content, providing students with easy access to:
- Weekly tutorial notes and worked examples
- Video explanations of key concepts
- Course resources and reference materials
- Interactive learning tools

## Features

### Content
- 📝 **Tutorial Notes** - MDX-based notes with LaTeX math rendering
- 🎥 **Video Library** - Embedded YouTube explanations
- 📚 **Course Resources** - Supplementary materials and references
- 🎯 **Tutorials** - Step-by-step problem walkthroughs

### Technical
- ⚡ Next.js 14 App Router for fast navigation
- 📐 KaTeX for beautiful mathematical notation
- 🎨 Tailwind CSS for responsive design
- 📱 Mobile-friendly layout

## Impact

- Used as primary supplementary resource for **120+ students** across 2 tutorial sections
- Positive student feedback leading to improved learning outcomes
- Streamlined TA-student communication

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe development |
| MDX | Markdown with JSX for content |
| Tailwind CSS | Utility-first styling |
| KaTeX | LaTeX math rendering |
| Vercel | Hosting and deployment |

## Project Structure

```
apsc174/
├── app/
│   ├── notes/           # Weekly notes pages
│   ├── videos/          # Video content
│   ├── tutorials/       # Tutorial walkthroughs
│   ├── course-resources/# Reference materials
│   └── components/      # Reusable UI components
├── content/
│   ├── notes/           # MDX note files
│   └── templates/       # Content templates
├── lib/                 # Utility functions
└── public/              # Static assets
```

## Local Development

```bash
# Clone the repository
git clone https://github.com/JackSwitzerSchool/apsc174.git
cd apsc174

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Topics

### Linear Algebra Fundamentals
- Systems of linear equations
- Matrix operations and properties
- Determinants
- Vector spaces
- Eigenvalues and eigenvectors
- Linear transformations
- Orthogonality

## Acknowledgments

- Queen's University Mathematics Department
- APSC 174 / MATH 111 course instructors
- Template: [Vercel Portfolio Starter](https://portfolio-blog-starter.vercel.app)

## Author

**Jack Switzer**
Teaching Assistant, Queen's University
[jackswitzer.com](https://jackswitzer.com) | [GitHub](https://github.com/jackswitzer)

## License

MIT

import fs from 'fs' //note: maybe delete this
import path from 'path'
import Link from 'next/link'

export const metadata = {
  title: 'Course Resources',
  description: 'Course materials and PDF resources.',
}

function getPDFFiles() {
  const resourcesDir = path.join(process.cwd(), 'public', 'CourseContent')
  try {
    if (!fs.existsSync(resourcesDir)) {
      return []
    }
    return fs.readdirSync(resourcesDir)
      .filter(file => file.toLowerCase().endsWith('.pdf'))
      .map(file => ({
        name: file.replace('.pdf', ''),
        path: `/CourseContent/${file}`
      }))
  } catch (error) {
    console.error('Error reading PDF files:', error)
    return []
  }
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Course Resources
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <h2>Course Base</h2>
        <ul>
          <li>Syllabus
            <ul>
              <li><a href="/CourseContent/base/First Year Resources.pdf">Lecture Notes</a></li>
            </ul>
          </li>
          <li> Mansouri Notes
            <ul>
              <li><a href="/CourseContent/base/Mansouri Notes.pdf">Mansouri Notes</a></li>
            </ul>
          </li>
          <li> Textbook (4th edition)
            <ul>
              <li><a href="/CourseContent/base/First Year Resources.pdf">Lecture Notes</a></li>
            </ul>
          </li>
          <li>Document Scanning Guide lol
            <ul>
              <li><a href="/CourseContent/base/Document Scanning Guide.pdf">Document Scanning Guide</a></li>
            </ul>
          </li>
          <li>First Year Resources
            <ul>
              <li><a href="/CourseContent/base/First Year Resources.pdf">Lecture Notes</a></li>
            </ul>
          </li>
          
        </ul>

      </div>

    </section>
  )
}
import fs from 'fs'
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
  const pdfFiles = getPDFFiles()

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Course Resources</h1>
      <div className="space-y-4">
        {pdfFiles.length > 0 ? (
          pdfFiles.map((file) => (
            <div key={file.path} className="flex">
              <Link
                href={file.path}
                className="text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.name}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-neutral-600 dark:text-neutral-400">
            No PDF resources available at this time.
          </p>
        )}
      </div>
    </section>
  )
}
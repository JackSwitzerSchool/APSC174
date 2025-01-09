import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Course Resources',
  description: 'Course materials and PDF resources.',
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Course Resources
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <ul>
          <li>Syllabus
            <ul>
              <li><a href="/base/Syllabus2025.pdf" aria-label="Download Syllabus PDF">Syllabus</a></li>
            </ul>
          </li>
          <li>Mansouri Notes
            <ul>
              <li><a href="/base/Mansouri-Notes.pdf" aria-label="Download Mansouri Notes PDF">Mansouri Notes</a></li>
            </ul>
          </li>
          <li>Totally not the Textbook
            <ul>
              <li>
                <a 
                  href="https://drive.google.com/file/d/1ZXD4xNHmzAa3i5ysoL7ITZuN6mji_fwj/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open textbook in Google Drive (opens in new tab)"
                >
                  book
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  )
}
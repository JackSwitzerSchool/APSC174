import { CustomMDX } from '../components/mdx'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

function getHeaderContent() {
  try {
    const headerPath = path.join(process.cwd(), 'public', 'tutorials', 'tutorialsHeader.md')
    return fs.readFileSync(headerPath, 'utf-8')
  } catch (error) {
    console.warn('Could not read tutorials header:', error)
    return ''
  }
}

export default function TutorialsPage() {
  const headerContent = getHeaderContent()
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
      <div className="prose dark:prose-invert">
        <CustomMDX source={headerContent} />
      </div>
    </section>
  )
} 
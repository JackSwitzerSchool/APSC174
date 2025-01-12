import { CustomMDX } from '../components/mdx'
import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'

export const metadata = {
  title: 'Tutorials',
  description: 'Course tutorials and practice problems.',
}

async function getHeaderContent() {
  try {
    const headerPath = path.join(process.cwd(), 'public', 'tutorials', 'tutorialsHeader.md')
    const content = fs.readFileSync(headerPath, 'utf-8')
    return await serialize(content)
  } catch (error) {
    console.warn('Could not read tutorials header:', error)
    return null
  }
}

export default async function TutorialsPage() {
  const headerContent = await getHeaderContent()
  
  if (!headerContent) {
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
        <p>No tutorial content found</p>
      </section>
    )
  }
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorials</h1>
      <div className="prose dark:prose-invert">
        <CustomMDX source={headerContent} />
      </div>
    </section>
  )
} 
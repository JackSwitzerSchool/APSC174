import Image from 'next/image'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata = {
  title: 'QR Code',
  description: 'Weekly QR code for feedback.',
}

export default async function OutroPage() {
  try {
    // Get all files in the outro directory
    const outroDir = path.join(process.cwd(), 'public', 'outro')
    const files = await fs.readdir(outroDir)
    
    // Find the most recent week file
    const weekFiles = files.filter(file => file.toLowerCase().startsWith('week'))
    if (weekFiles.length === 0) {
      throw new Error('No week files found')
    }

    // Sort files to get the latest week
    const latestFile = weekFiles.sort().reverse()[0]
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src={`/outro/${latestFile}`}
          alt="Weekly QR Code"
          width={400}
          height={400}
          priority
          className="max-w-full h-auto"
        />
      </div>
    )
  } catch (error) {
    console.error('Error in OutroPage:', error)
    notFound()
  }
} 
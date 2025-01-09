import { YouTube } from '../components/youtube'

export const metadata = {
  title: 'YouTube Videos',
  description: 'Educational content and tutorials.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">YouTube Videos</h1>
      <YouTube 
        id="fNk_zzaMoSs" 
        title="Vectors, what even are they? | Essence of Linear Algebra, Chapter 1" 
      />
    </section>
  )
} 
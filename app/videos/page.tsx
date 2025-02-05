import { YouTube } from '../components/youtube'

export const metadata = {
  title: 'YouTube Videos',
  description: 'Educational content and tutorials.',
}

export default function Page() {
  return (
    <section className="space-y-8">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">YouTube Videos</h1>
      
      <div className="space-y-6">
        <h2 className="font-medium text-xl tracking-tighter">Midterm 1 Review Videos</h2>
        <p className="text-sm text-gray-600 italic mb-4">
          Note: I didn't properly prove the 0 function is in W for the 2nd video. It is clear that with 0(x) = x ∀x ∈ ℝ and 0"(x)=0'(x)=0 and thus abides by the set rule for W as 0"(x)=0'(x)+2*0(x)=0 so 0(x) ∈ W
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <YouTube 
              id="zemJMNhUlHE" 
              title="Midterm 1 Review Part 1 - The Basics" 
            />
          </div>
          <div className="w-full">
            <YouTube 
              id="tzrussi7nDQ" 
              title="Midterm 1 Review Part 2 - Functions & Subspaces" 
            />
          </div>
          <div className="w-full">
            <YouTube 
              id="pRx3T-defWY" 
              title="Midterm 1 Review Part 3 - Proofs" 
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-medium text-xl tracking-tighter">The Fundamentals</h2>
        <div className="w-full max-w-3xl">
          <YouTube 
            id="fNk_zzaMoSs" 
            title="Vectors, what even are they? | Essence of Linear Algebra, Chapter 1" 
          />
        </div>
      </div>
    </section>
  )
} // whoops
export const metadata = {
  title: 'Onboarding Animation',
  description: 'Welcome animation sequence.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Welcome Animation
      </h1>
      <div className="w-full aspect-square relative">
        <iframe
          src="/components/animation.html"
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        />
      </div>
    </section>
  )
} 
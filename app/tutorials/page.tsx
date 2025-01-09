export const metadata = {
  title: 'Tutorial Problems',
  description: 'Practice problems and solutions.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorial Problems</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <h2 className="text-xl font-medium">
          Week 1:{' '}
          <a href="/tutorials/week1/Tutorial1Questions.pdf" className="text-blue-500 hover:text-blue-600">
            Problems
          </a>
          {' | '}
          <a href="/tutorials/week1/Tutorial1Solutions.pdf" className="text-blue-500 hover:text-blue-600">
            Solutions
          </a>
        </h2>
      </div>
    </section>
  )
} 
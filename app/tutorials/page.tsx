export const metadata = {
  title: 'Tutorial Problems',
  description: 'Practice problems and solutions.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Tutorial Problems</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <ul>
          <li>Week 1
            <ul>
              <li><a href="/tutorials/week1.pdf">Tutorial 1 Problems</a></li>
              <li><a href="/tutorials/week1-solutions.pdf">Tutorial 1 Solutions</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  )
} 
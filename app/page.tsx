import { BlogPosts } from 'app/components/posts' //note: this could be in components/posts.tsx

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`Welcome.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}

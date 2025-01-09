import { BlogPosts } from 'app/components/posts' 

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        APSC174 Course Website
      </h1>
      <p className="mb-4">
        {`Welcome.`}
      </p>
      <div className="my-8">  /* note: This is where posts are rendered */
        <BlogPosts />
      </div>
    </section>
  )
}

import { BlogPosts } from '@/app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        APSC 174: Linear Algebra for Engineering Applications
      </h1>
      <BlogPosts />
    </section>
  )
}

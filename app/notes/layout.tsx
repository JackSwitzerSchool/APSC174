export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-xl py-8">
      {children}
    </div>
  )
} 
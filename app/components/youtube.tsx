type YouTubeProps = {
  id: string;
  title?: string;
};

export function YouTube({ id, title = 'YouTube Video' }: YouTubeProps) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full my-4">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  );
} 
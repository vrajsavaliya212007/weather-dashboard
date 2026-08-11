import { FaExternalLinkAlt } from "react-icons/fa";

function NewsCard({ article }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
      <img
        src={article.image || "https://placehold.co/600x350?text=Weather+News"}
        alt={article.title}
        className="h-56 w-full object-cover"
      />
      <div className="p-6">
        <p className="text-sm text-blue-600">{article.source}</p>
        <h2 className="mt-3 line-clamp-2 text-xl font-bold">{article.title}</h2>
        <p className="mt-3 line-clamp-3 text-slate-500">
          {article.description}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
          >
            Read
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;

import NewsCard from "./NewsCard";

function NewsGrid({ news = [] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {news.map((item) => (
        <NewsCard key={item._id} article={item} />
      ))}
    </div>
  );
}

export default NewsGrid;

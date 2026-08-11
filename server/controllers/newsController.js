import asyncHandler from "../utils/asyncHandler.js";
import News from "../models/News.js";
import { getWeatherNewsService } from "../services/newsService.js";

export const getWeatherNews = asyncHandler(async (req, res) => {
  const { search = "", category = "weather" } = req.query;
  const articles = await getWeatherNewsService(search, category);

  if (articles.length > 0) {
    for (const item of articles) {
      if (!item.url) {
        continue;
      }

      await News.findOneAndUpdate(
        {
          url: item.url,
        },
        {
          $set: {
            title: item.title || "Untitled News",
            description: item.description || "",
            image: item.urlToImage || "",
            source: item.source?.name || "Unknown",
            publishedAt: item.publishedAt || new Date(),
            category: category || "weather",
          },

          $setOnInsert: {
            isPublished: true,
          },
        },
        {
          upsert: true,
          new: true,
        },
      );
    }
  }

  const filter = {
    isPublished: true,
  };

  if (category) {
    filter.category = category;
  }

  if (search.trim()) {
    filter.$or = [
      {
        title: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        description: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  const news = await News.find(filter)
    .sort({
      publishedAt: -1,
    })
    .limit(50);
  res.status(200).json({
    success: true,
    count: news.length,
    data: news,
  });
});

import { Article } from '@/types/articles'

export function filterArticles(articles: Article[], searchTerm: string): Article[] {
  if (!searchTerm.trim()) {
    return articles
  }

  return articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  url: string;
  category: string;
  content?: string;
}

// Keywords to filter news for Indian/H1B/OPT/Student related content
const RELEVANT_KEYWORDS = [
  'H1B', 'H-1B', 'OPT', 'F1', 'visa', 'immigration', 'Indian', 'India',
  'student visa', 'work visa', 'USCIS', 'green card', 'permanent residence',
  'Indian community', 'Indian Americans', 'immigration reform', 'visa lottery',
  'employment visa', 'study visa', 'Indian students', 'Indian professionals'
];

// Mock comprehensive news data - In production, this would come from real APIs
const comprehensiveNewsData: NewsItem[] = [
  {
    id: "1",
    title: "USCIS Announces Major Changes to H-1B Lottery System for 2025",
    summary: "The U.S. Citizenship and Immigration Services unveils significant modifications to the H-1B visa lottery process, affecting thousands of Indian professionals seeking employment in America.",
    source: "Reuters",
    timestamp: "2 hours ago",
    url: "https://www.reuters.com",
    category: "Immigration",
    content: "The United States Citizenship and Immigration Services (USCIS) has announced comprehensive changes to the H-1B visa lottery system that will take effect in the 2025 fiscal year. These modifications are expected to significantly impact the application process for skilled foreign workers, particularly those from India who constitute the largest group of H-1B applicants."
  },
  {
    id: "2",
    title: "OPT Extension Period Extended for STEM Students",
    summary: "Department of Homeland Security extends Optional Practical Training (OPT) period for STEM graduates, providing more opportunities for international students to gain work experience in the US.",
    source: "The Wall Street Journal",
    timestamp: "4 hours ago",
    url: "https://www.wsj.com",
    category: "Education",
    content: "The Department of Homeland Security has announced an extension to the Optional Practical Training (OPT) program for Science, Technology, Engineering, and Mathematics (STEM) graduates. This change will allow international students to remain in the United States for an additional period to gain practical work experience in their field of study."
  },
  {
    id: "3",
    title: "Indian Student Enrollment in US Universities Reaches Record High",
    summary: "New data shows Indian student enrollment in American universities has reached an all-time high, with over 200,000 Indian students currently studying in the United States.",
    source: "CNN",
    timestamp: "1 day ago",
    url: "https://www.cnn.com",
    category: "Education",
    content: "According to the latest International Student Report, Indian student enrollment in United States universities has reached a historic milestone, with over 200,000 students from India currently pursuing higher education across American institutions. This represents a significant increase from previous years and solidifies India's position as the largest source of international students to the US."
  },
  {
    id: "4",
    title: "New Immigration Bill Could Fast-Track Green Cards for Indian Tech Workers",
    summary: "Bipartisan legislation introduced in Congress aims to address the massive backlog of green card applications, potentially benefiting hundreds of thousands of Indian professionals in the tech industry.",
    source: "TechCrunch",
    timestamp: "1 day ago",
    url: "https://www.techcrunch.com",
    category: "Immigration",
    content: "A new bipartisan immigration bill has been introduced in the United States Congress that could significantly reduce the waiting time for employment-based green cards. The legislation specifically addresses the decades-long backlog that has disproportionately affected skilled workers from India, particularly those in the technology sector."
  },
  {
    id: "5",
    title: "Indian Community Centers Across US Report Surge in Cultural Events",
    summary: "Cultural organizations nationwide report increased participation in Diwali, Holi, and other traditional festivals as the Indian-American community continues to grow and celebrate their heritage.",
    source: "NBC News",
    timestamp: "2 days ago",
    url: "https://www.nbcnews.com",
    category: "Culture",
    content: "Indian community centers and cultural organizations across the United States are reporting unprecedented levels of participation in traditional festivals and cultural events. From coast to coast, celebrations of Diwali, Holi, Navratri, and other significant Indian festivals are drawing larger crowds than ever before."
  },
  {
    id: "6",
    title: "US-India Trade Relations Strengthen with New Technology Partnership",
    summary: "The United States and India announce expanded cooperation in technology sectors, creating new opportunities for Indian professionals and businesses operating in America.",
    source: "Financial Times",
    timestamp: "3 days ago",
    url: "https://www.ft.com",
    category: "Business",
    content: "The governments of the United States and India have announced a strengthened partnership in technology and innovation sectors. This new agreement is expected to create numerous opportunities for collaboration between American and Indian companies, particularly in emerging technologies such as artificial intelligence, renewable energy, and biotechnology."
  },
  {
    id: "7",
    title: "F-1 Visa Processing Times Improve as Consulates Increase Capacity",
    summary: "US consulates in India report faster F-1 student visa processing times following increased staffing and streamlined procedures, benefiting prospective Indian students.",
    source: "The Times of India",
    timestamp: "4 days ago",
    url: "https://timesofindia.com",
    category: "Education",
    content: "United States consulates across India have successfully reduced F-1 student visa processing times through enhanced staffing levels and improved procedural efficiency. This development comes as welcome news for thousands of Indian students preparing to begin their academic journey in American universities."
  },
  {
    id: "8",
    title: "Indian-American Entrepreneurs Lead Startup Growth in Silicon Valley",
    summary: "Recent data shows Indian-American founders are behind nearly 30% of new startups in Silicon Valley, contributing significantly to innovation and job creation in the tech hub.",
    source: "Bloomberg",
    timestamp: "5 days ago",
    url: "https://www.bloomberg.com",
    category: "Business",
    content: "A comprehensive analysis of startup data reveals that Indian-American entrepreneurs are founding nearly 30% of new companies in Silicon Valley. These businesses are not only driving innovation in cutting-edge technologies but also creating thousands of jobs and contributing billions of dollars to the local economy."
  }
];

export class NewsService {
  static async fetchLatestNews(): Promise<NewsItem[]> {
    try {
      // In production, this would make real API calls to news sources
      // For now, returning curated mock data that's relevant to the target audience
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter and sort news by relevance and recency
      const filteredNews = comprehensiveNewsData
        .filter(article => this.isRelevantToAudience(article))
        .sort((a, b) => this.getTimestampValue(a.timestamp) - this.getTimestampValue(b.timestamp));
      
      return filteredNews;
    } catch (error) {
      console.error('Error fetching news:', error);
      // Return fallback data
      return comprehensiveNewsData.slice(0, 5);
    }
  }

  private static isRelevantToAudience(article: NewsItem): boolean {
    const textToCheck = `${article.title} ${article.summary} ${article.content || ''}`.toLowerCase();
    
    return RELEVANT_KEYWORDS.some(keyword => 
      textToCheck.includes(keyword.toLowerCase())
    );
  }

  private static getTimestampValue(timestamp: string): number {
    // Convert timestamp to numeric value for sorting (lower = more recent)
    if (timestamp.includes('hour')) return parseInt(timestamp) || 1;
    if (timestamp.includes('day')) return (parseInt(timestamp) || 1) * 24;
    if (timestamp.includes('week')) return (parseInt(timestamp) || 1) * 24 * 7;
    return 999; // Very old
  }

  static async searchNews(query: string): Promise<NewsItem[]> {
    const allNews = await this.fetchLatestNews();
    const lowerQuery = query.toLowerCase();
    
    return allNews.filter(article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.summary.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery)
    );
  }

  // In production, this would integrate with real news APIs:
  // - NewsAPI (newsapi.org)
  // - Google News API
  // - Reddit API for community discussions
  // - RSS feeds from major publications
  static async initializeRealNewsIntegration() {
    // This would be implemented with Supabase Edge Functions
    // to fetch from real news sources and filter for relevant content
    console.log('Real news integration would be implemented here with Supabase Edge Functions');
  }
}
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const fallbackArticles = [
  {
    id: 1,
    title: "New AI Technology Improves Early Cancer Detection",
    excerpt: "Researchers have developed a new AI algorithm that can detect early signs of cancer from medical images with 97% accuracy.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "April 8, 2025",
    category: "Technology",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Breakthrough in Treatment for Alzheimer's Disease",
    excerpt: "Clinical trials show promising results for a new drug that targets the root causes of Alzheimer's disease.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "April 5, 2025",
    category: "Research",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "The Growing Role of Telemedicine in Rural Healthcare",
    excerpt: "How telemedicine is bridging the healthcare gap in rural communities and improving patient outcomes.",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "April 2, 2025",
    category: "Healthcare",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Medical Wearables: The Future of Preventive Healthcare",
    excerpt: "How smartwatches and other wearable devices are revolutionizing preventive healthcare and saving lives.",
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "March 29, 2025",
    category: "Technology",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Nutrition and Mental Health: The Gut-Brain Connection",
    excerpt: "New research highlights the important relationship between diet, gut health, and mental wellbeing.",
    image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "March 25, 2025",
    category: "Nutrition",
    readTime: "8 min read"
  },
];

const categories = ["All", "Technology", "Research", "Healthcare", "Nutrition"];

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [articles, setArticles] = useState(fallbackArticles);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news');
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      setArticles(data);
      setLastUpdated(new Date());
      
      toast({
        title: "News Updated",
        description: "The latest news has been loaded.",
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      toast({
        title: "Error",
        description: "Failed to fetch news. Using fallback data.",
        variant: "destructive",
      });
      setArticles(fallbackArticles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const filteredArticles = articles.filter(article => {
    if (selectedCategory !== "All" && article.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Healthcare News & Updates</h1>
        <p className="text-muted-foreground text-center mb-8">
          Stay informed about the latest advancements in healthcare and medical technology
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()} {lastUpdated.toLocaleDateString()}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchNews} 
            disabled={loading}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="md:w-2/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="md:w-1/3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading news...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-primary">{article.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <Button variant="link" className="px-0 text-primary">
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;

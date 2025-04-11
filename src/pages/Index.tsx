import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AISearchBar from "@/components/AISearchBar";
import { Calendar, Stethoscope, BarChart3, Search, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  // News articles data
  const newsArticles = [
    {
      id: 1,
      title: "New Research on Heart Disease Prevention",
      excerpt: "Recent study shows promising results for preventative measures against heart disease.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "COVID-19: Latest Updates and Guidelines",
      excerpt: "Stay informed with the most recent developments and health recommendations.",
      image: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Breakthrough in Cancer Treatment",
      excerpt: "Scientists discover new approach that shows significant promise in clinical trials.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    // Auto hide banner after 5 seconds
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {showBanner && (
        <div className="bg-primary text-primary-foreground py-2 px-4 text-center relative">
          <p className="text-sm font-medium">
            Welcome to HealthFact - AI-powered symptom checker now available!
          </p>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm"
            onClick={() => setShowBanner(false)}
          >
            ✕
          </button>
        </div>
      )}
      
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-primary">HealthFact</span> Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Advanced AI-powered healthcare technology to validate medical information and connect you with the right specialists
          </p>
          <div className="max-w-lg mx-auto">
            <AISearchBar />
          </div>
        </div>
      </section>

      {/* News Carousel Section */}
      <section className="py-8 px-4 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Health News</h2>
            <Link to="/news" className="flex items-center text-primary hover:underline">
              View all news <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {newsArticles.map((article) => (
                <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to="/news">
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                        <p className="text-muted-foreground">{article.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* How HealthFact Helps You section */}
      <section className="py-12 px-4 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            How HealthFact Helps You
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Verify Medical Info</h3>
                <p className="text-muted-foreground">
                  Use our AI to verify the accuracy of medical information from text, images, or links
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Symptom Analysis</h3>
                <p className="text-muted-foreground">
                  Describe your symptoms and get AI-powered analysis and specialist recommendations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Doctor Appointments</h3>
                <p className="text-muted-foreground">
                  Book appointments with recommended specialists in your area quickly and easily
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Your Health Journey Starts Here
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust our platform for reliable healthcare guidance
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-primary">
                Create Account
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Chatbot component */}
      <Chatbot />
    </div>
  );
};

export default Index;

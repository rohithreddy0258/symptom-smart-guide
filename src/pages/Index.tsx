
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AISearchBar from "@/components/AISearchBar";
import { Calendar, Stethoscope, BarChart3, Search } from "lucide-react";

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);

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
            New feature: AI-powered symptom checker now available!
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
            <span className="text-primary">Smart Health</span> Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Advanced AI-powered healthcare technology to validate medical information and connect you with the right specialists
          </p>
          <div className="max-w-lg mx-auto">
            <AISearchBar />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            How HealthTech Helps You
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
    </div>
  );
};

export default Index;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-xl font-bold text-primary">HealthTech</Link>
              <p className="mt-2 text-sm text-muted-foreground">
                Making healthcare information accessible, accurate, and actionable.
              </p>
              <div className="flex space-x-4 mt-4">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-sm font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/appoint" className="text-muted-foreground hover:text-foreground">
                    Find a Doctor
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-muted-foreground hover:text-foreground">
                    Latest News
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-sm font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h3 className="text-sm font-medium mb-4">Subscribe</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest health updates and news
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="rounded-l-none bg-primary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border py-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} HealthTech. All rights reserved. Made with{" "}
            <Heart className="inline-block h-4 w-4 text-red-500" /> for healthier lives.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

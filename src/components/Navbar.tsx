
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Calendar, 
  Newspaper, 
  Info, 
  Menu, 
  X, 
  LogIn, 
  UserPlus 
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">HealthTech</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link to="/appoint" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
              <Calendar className="mr-1 h-4 w-4" />
              Appoint a Doctor
            </Link>
            <Link to="/news" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
              <Newspaper className="mr-1 h-4 w-4" />
              News
            </Link>
            <Link to="/about" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
              <Info className="mr-1 h-4 w-4" />
              About Us
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-2">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="flex items-center">
                <LogIn className="mr-1 h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" size="sm" className="flex items-center bg-primary">
                <UserPlus className="mr-1 h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              onClick={toggleMenu} 
              className="inline-flex items-center justify-center p-2 rounded-md"
            >
              {isMenuOpen ? 
                <X className="h-6 w-6" /> : 
                <Menu className="h-6 w-6" />
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
            <Link 
              to="/appoint" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Appoint a Doctor
            </Link>
            <Link 
              to="/news" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Newspaper className="mr-2 h-5 w-5" />
              News
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info className="mr-2 h-5 w-5" />
              About Us
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link 
                to="/login" 
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Button>
              </Link>
              <Link 
                to="/signup" 
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="default" className="w-full flex items-center justify-center bg-primary">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

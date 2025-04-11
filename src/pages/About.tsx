
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  UserPlus, 
  Mail, 
  PhoneCall, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const team = [
  {
    name: "Dr. Elizabeth Thomas",
    role: "Chief Medical Officer",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    bio: "Dr. Thomas brings 15 years of clinical experience and a passion for healthcare innovation."
  },
  {
    name: "Mark Chen",
    role: "Chief Technology Officer",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    bio: "Mark leads our technology development with expertise in AI and medical informatics."
  },
  {
    name: "Dr. Sophia Williams",
    role: "Medical Content Director",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Dr. Williams ensures all medical information on our platform is accurate and up-to-date."
  },
  {
    name: "James Wilson",
    role: "User Experience Lead",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "James designs intuitive experiences that make healthcare technology accessible to all."
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About HealthTech</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-muted-foreground">
            We're on a mission to transform healthcare through technology, making accurate medical information accessible to everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <p className="mb-4 text-muted-foreground">
                HealthTech was founded in 2023 by a team of healthcare professionals and technology experts who recognized the need for a reliable platform that could verify medical information and connect patients with the right specialists.
              </p>
              <p className="mb-4 text-muted-foreground">
                Our AI-powered platform has helped thousands of users validate health information, understand their symptoms, and find appropriate medical care when needed.
              </p>
              <p className="text-muted-foreground">
                We collaborate with leading healthcare institutions and maintain the highest standards of data privacy and security, ensuring that our users can trust the information and services we provide.
              </p>
            </div>
            <div className="bg-secondary/50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Medical Accuracy</h4>
                    <p className="text-sm text-muted-foreground">We verify all medical information with rigorous AI and expert review.</p>
                  </div>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Accessibility</h4>
                    <p className="text-sm text-muted-foreground">Healthcare information should be understandable and accessible to everyone.</p>
                  </div>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Innovation</h4>
                    <p className="text-sm text-muted-foreground">We constantly improve our technology to provide better healthcare solutions.</p>
                  </div>
                </li>
                <li className="flex">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Privacy</h4>
                    <p className="text-sm text-muted-foreground">Your health data is yours. We maintain the highest standards of privacy and security.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our diverse team of medical professionals, technology experts, and healthcare advocates are dedicated to our mission.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions or feedback? We'd love to hear from you. Contact our team or follow us on social media.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>contact@healthtech.com</span>
                </div>
                <div className="flex items-center">
                  <PhoneCall className="h-5 w-5 text-primary mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>123 Health Avenue, San Francisco, CA 94103</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="text-muted-foreground mb-6">
                Create an account to access personalized health insights and connect with specialists.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-primary" asChild>
                  <a href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up Today
                  </a>
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

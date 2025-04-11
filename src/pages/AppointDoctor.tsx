import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const fallbackDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "City Medical Center",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    hospital: "University Hospital",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    hospital: "Children's Health Center",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    hospital: "Sports Medicine Clinic",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 4.8,
    reviews: 88,
  },
];

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Gastroenterology",
  "Oncology",
  "Psychiatry",
];

const AppointDoctor = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const { toast } = useToast();
  
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>("");

  const getUserLocation = () => {
    setLocationStatus("Getting your location...");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          setLocationStatus("Location found");
          fetchDoctors(userLoc.lat, userLoc.lng, selectedSpecialty);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationStatus("Unable to retrieve your location");
          fetchDoctors(null, null, selectedSpecialty);
        }
      );
    } else {
      setLocationStatus("Geolocation is not supported by your browser");
      fetchDoctors(null, null, selectedSpecialty);
    }
  };

  const fetchDoctors = async (lat: number | null, lng: number | null, specialty: string) => {
    setLoading(true);
    try {
      let url = `/api/doctors?specialty=${encodeURIComponent(specialty)}`;
      if (lat && lng) {
        url += `&lat=${lat}&lng=${lng}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      toast({
        title: "Error",
        description: "Failed to fetch doctors. Using fallback data.",
        variant: "destructive",
      });
      setDoctors(fallbackDoctors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchDoctors(userLocation.lat, userLocation.lng, selectedSpecialty);
    } else {
      fetchDoctors(null, null, selectedSpecialty);
    }
  }, [selectedSpecialty]);

  const filteredDoctors = doctors.filter(doctor => {
    if (searchQuery && !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleBookAppointment = (doctorId: number) => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You need to select a date for your appointment",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Appointment Booked!",
      description: `Your appointment has been scheduled for ${format(selectedDate, "PPP")}`,
    });
    
    setSelectedDoctor(null);
    setSelectedDate(undefined);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Find and Appoint a Doctor</h1>
        <p className="text-muted-foreground text-center mb-8">Search for specialists and book your appointment</p>
        
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm">{locationStatus}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={getUserLocation}
              className="flex items-center gap-1"
            >
              <Navigation className="h-4 w-4" />
              Update Location
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <Input
              placeholder="Search by doctor name or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                      <p className="text-primary mb-1">{doctor.specialty}</p>
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{doctor.hospital}</span>
                      </div>
                      
                      {doctor.distance && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {doctor.distance} km from your location
                        </p>
                      )}
                      
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(doctor.rating) ? "text-amber-500" : "text-gray-300"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm ml-2">{doctor.rating} ({doctor.reviews} reviews)</span>
                      </div>
                      
                      {selectedDoctor === doctor.id ? (
                        <div className="space-y-4">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !selectedDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" className="flex-1" onClick={() => setSelectedDoctor(null)}>
                              Cancel
                            </Button>
                            <Button 
                              className="flex-1 bg-primary"
                              onClick={() => handleBookAppointment(doctor.id)}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          className="w-full bg-primary"
                          onClick={() => setSelectedDoctor(doctor.id)}
                        >
                          Book Appointment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointDoctor;

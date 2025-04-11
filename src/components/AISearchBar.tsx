
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  X, 
  Upload,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type SearchMode = "text" | "image" | "link";

const AISearchBar = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>("text");
  const [searchValue, setSearchValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    message: string;
  } | null>(null);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState<{
    condition: string;
    doctorType: string;
    hospitals: string[];
  } | null>(null);

  const { toast } = useToast();

  const handleSearchModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
    setSearchValue("");
    setImagePreview(null);
    setVerificationResult(null);
    setShowSymptomChecker(false);
    setDiagnosis(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSearch = () => {
    if (!searchValue && !imagePreview) {
      toast({
        title: "Empty search",
        description: "Please enter some text, upload an image, or provide a link",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // This would be an actual API call in production
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock verification result
      setVerificationResult({
        verified: Math.random() > 0.3, // Simulate some false results
        message: Math.random() > 0.3 
          ? "Information appears to be medically accurate." 
          : "Information contains potential inaccuracies. Please consult a healthcare professional.",
      });
      
      setShowSymptomChecker(true);
    }, 2000);
  };

  const handleSymptomCheck = () => {
    if (!symptoms.trim()) {
      toast({
        title: "No symptoms entered",
        description: "Please describe your symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // This would be an actual API call in production
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock diagnosis data
      const conditions = [
        {
          condition: "Common Cold",
          doctorType: "General Practitioner",
          hospitals: ["City Medical Center", "Community Health Clinic", "Regional Hospital"]
        },
        {
          condition: "Allergic Rhinitis",
          doctorType: "Allergist",
          hospitals: ["Allergy & Asthma Center", "University Medical Hospital", "Healthcare Partners"]
        },
        {
          condition: "Gastroenteritis",
          doctorType: "Gastroenterologist",
          hospitals: ["Digestive Health Institute", "Memorial Medical Center", "Gastro Specialists"]
        }
      ];
      
      setDiagnosis(conditions[Math.floor(Math.random() * conditions.length)]);
    }, 2000);
  };

  const resetSearch = () => {
    setSearchValue("");
    setImagePreview(null);
    setVerificationResult(null);
    setShowSymptomChecker(false);
    setSymptoms("");
    setDiagnosis(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card rounded-lg shadow-md p-4">
        <div className="flex space-x-2 mb-4">
          <Button
            variant={searchMode === "text" ? "default" : "outline"}
            onClick={() => handleSearchModeChange("text")}
            className={searchMode === "text" ? "bg-primary" : ""}
          >
            <Search className="h-4 w-4 mr-2" />
            Text
          </Button>
          <Button
            variant={searchMode === "image" ? "default" : "outline"}
            onClick={() => handleSearchModeChange("image")}
            className={searchMode === "image" ? "bg-primary" : ""}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Image
          </Button>
          <Button
            variant={searchMode === "link" ? "default" : "outline"}
            onClick={() => handleSearchModeChange("link")}
            className={searchMode === "link" ? "bg-primary" : ""}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Link
          </Button>
        </div>

        {searchMode === "text" && (
          <div className="flex">
            <Input
              placeholder="Enter medical information to verify..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className={cn("ml-2", isLoading ? "" : "bg-primary")}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
        )}

        {searchMode === "image" && (
          <div className="space-y-4">
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Uploaded preview" 
                  className="w-full h-48 object-contain border rounded-md"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-background/80"
                  onClick={() => setImagePreview(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-md p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload an image with medical information
                </p>
                <label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Select Image
                  </Button>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
            {imagePreview && (
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="w-full bg-primary"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Analyze Image
              </Button>
            )}
          </div>
        )}

        {searchMode === "link" && (
          <div className="flex">
            <Input
              placeholder="Enter URL with medical information..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className={cn("ml-2", isLoading ? "" : "bg-primary")}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
        )}

        {verificationResult && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-start">
                {verificationResult.verified ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">Verification Result:</p>
                  <p className="text-sm">{verificationResult.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {showSymptomChecker && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Are you experiencing any symptoms?</h3>
              <Textarea
                placeholder="Describe your symptoms (e.g., headache, fever, cough)..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mb-2"
                rows={3}
              />
              <Button 
                onClick={handleSymptomCheck} 
                disabled={isLoading}
                className="w-full bg-primary"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Analyze Symptoms
              </Button>
            </CardContent>
          </Card>
        )}

        {diagnosis && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 text-lg">Possible Condition</h3>
              <p className="mb-4">{diagnosis.condition}</p>
              
              <h4 className="font-medium mb-2">Recommended Specialist</h4>
              <p className="mb-4">{diagnosis.doctorType}</p>
              
              <h4 className="font-medium mb-2">Nearby Facilities</h4>
              <ul className="list-disc pl-5 mb-4">
                {diagnosis.hospitals.map((hospital, index) => (
                  <li key={index}>{hospital}</li>
                ))}
              </ul>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetSearch}>
                  Start New Search
                </Button>
                <Button 
                  className="bg-primary"
                  onClick={() => window.location.href = '/appoint'}
                >
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AISearchBar;

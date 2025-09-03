import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Upload, ArrowLeft, Mic, MicOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { toast } = useToast();

  const issueTypes = [
    "Pothole",
    "Broken Streetlight", 
    "Graffiti",
    "Garbage Collection",
    "Water Leak",
    "Damaged Signage",
    "Sidewalk Repair",
    "Other"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low", color: "bg-muted" },
    { value: "medium", label: "Medium", color: "bg-warning" },
    { value: "high", label: "High", color: "bg-destructive" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 3)); // Max 3 images
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Issue Reported Successfully!",
      description: "Your report has been submitted and assigned a tracking number #2024-0156.",
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Detected",
            description: `Coordinates: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to detect location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-success rounded"></div>
                <span className="font-bold text-foreground">CivicReport</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Report an Issue</h1>
          <p className="text-muted-foreground">
            Help improve your community by reporting problems that need attention.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-primary" />
              <span>Issue Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Issue Type */}
              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <Label>Urgency Level *</Label>
                <div className="flex gap-2">
                  {urgencyLevels.map((level) => (
                    <Badge 
                      key={level.value}
                      variant="outline"
                      className={`cursor-pointer hover:opacity-80 ${level.color} text-white border-0`}
                    >
                      {level.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="flex gap-2">
                  <Input 
                    id="location"
                    placeholder="Enter street address or nearest intersection"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={getCurrentLocation}
                    className="px-3"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    className={isRecording ? "bg-destructive text-white" : ""}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Voice Description
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Photos (Optional)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload photos or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum 3 photos, up to 10MB each
                    </p>
                  </label>
                </div>

                {/* Selected Images Preview */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Contact Information (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-hover hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Submit Issue Report
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  You'll receive a confirmation email with your tracking number
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;
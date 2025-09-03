import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Filter, Search, ArrowLeft, Navigation, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const IssueMap = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const mockIssues = [
    {
      id: "2024-0156",
      type: "Pothole",
      status: "In Progress",
      urgency: "High",
      location: "Main St & 1st Ave",
      reportedDate: "2024-01-15",
      description: "Large pothole causing traffic issues"
    },
    {
      id: "2024-0155", 
      type: "Broken Streetlight",
      status: "Resolved",
      urgency: "Medium",
      location: "Park Avenue",
      reportedDate: "2024-01-14",
      description: "Streetlight out near bus stop"
    },
    {
      id: "2024-0154",
      type: "Graffiti",
      status: "Pending",
      urgency: "Low",
      location: "City Hall Building",
      reportedDate: "2024-01-13",
      description: "Graffiti on south wall"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-success";
      case "In Progress":
        return "bg-warning";
      default:
        return "bg-muted";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-destructive";
      case "Medium":
        return "bg-warning";
      default:
        return "bg-muted";
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
            <Link to="/report">
              <Button className="bg-gradient-to-r from-primary to-primary-hover">
                Report Issue
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Issue Map</h1>
          <p className="text-muted-foreground">
            Explore reported issues in your area and track their resolution progress.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Interactive Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for actual map - would integrate with Mapbox/Google Maps */}
                <div className="bg-muted rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10"></div>
                  <div className="text-center z-10">
                    <Navigation className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Interactive Map Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      View all reported issues with location pins and real-time updates
                    </p>
                  </div>
                  
                  {/* Mock map pins */}
                  <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-destructive rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-warning rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-success rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Issue List */}
          <div className="space-y-6">
            {/* Filters */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by address..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Issue Type</label>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Issues</SelectItem>
                      <SelectItem value="pothole">Potholes</SelectItem>
                      <SelectItem value="streetlight">Streetlights</SelectItem>
                      <SelectItem value="graffiti">Graffiti</SelectItem>
                      <SelectItem value="garbage">Garbage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Recent Issues */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockIssues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {issue.id}
                        </Badge>
                        <Badge className={`text-xs text-white ${getUrgencyColor(issue.urgency)}`}>
                          {issue.urgency}
                        </Badge>
                      </div>
                      <Badge className={`text-xs text-white ${getStatusColor(issue.status)}`}>
                        {getStatusIcon(issue.status)}
                        <span className="ml-1">{issue.status}</span>
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium text-foreground mb-1">{issue.type}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {issue.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{issue.location}</span>
                      </div>
                      <span>{issue.reportedDate}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMap;
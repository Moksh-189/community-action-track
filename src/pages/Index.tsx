import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Shield, Users, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-civic.jpg";

const Index = () => {
  const stats = [
    { label: "Issues Reported", value: "2,847", icon: MapPin },
    { label: "Issues Resolved", value: "2,203", icon: CheckCircle2 },
    { label: "Active Users", value: "12,450", icon: Users },
    { label: "Response Time", value: "2.3 days", icon: BarChart3 },
  ];

  const features = [
    {
      icon: Camera,
      title: "Easy Reporting",
      description: "Upload photos and descriptions with automatic location detection"
    },
    {
      icon: MapPin,
      title: "Location Mapping",
      description: "View and track issues on an interactive neighborhood map"
    },
    {
      icon: Shield,
      title: "Admin Dashboard",
      description: "Comprehensive tools for managing and prioritizing community issues"
    },
    {
      icon: Users,
      title: "Department Coordination",
      description: "Seamless assignment and tracking across municipal departments"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg"></div>
              <span className="text-xl font-bold text-foreground">CivicReport</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost">Admin</Button>
              </Link>
              <Link to="/department">
                <Button variant="ghost">Department</Button>
              </Link>
              <Link to="/report">
                <Button className="bg-gradient-to-r from-primary to-primary-hover hover:opacity-90 transition-opacity">
                  Report Issue
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern civic community" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Community-Driven Solutions
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Report Issues.
              <br />
              <span className="bg-gradient-to-r from-white to-success-foreground bg-clip-text text-transparent">
                Build Community.
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Help improve your neighborhood by reporting issues directly to local authorities. 
              Track progress and see real change happen in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/report">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-colors w-full sm:w-auto">
                  <Camera className="mr-2 h-5 w-5" />
                  Report an Issue
                </Button>
              </Link>
              <Link to="/map">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  View Issue Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-sm border-0 bg-white">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Make a Difference
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform connects citizens, administrators, and departments for efficient 
              issue resolution and community improvement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-success">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Improve Your Community?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens making a real difference in their neighborhoods.
          </p>
          <Link to="/report">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-colors">
              <Camera className="mr-2 h-5 w-5" />
              Report Your First Issue
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg"></div>
              <span className="text-xl font-bold">CivicReport</span>
            </div>
            <p className="text-white/70 text-center md:text-right">
              © 2024 CivicReport. Building stronger communities together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
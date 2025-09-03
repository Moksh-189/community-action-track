import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  TrendingUp,
  Search,
  Filter,
  Download,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  
  const stats = [
    { label: "Total Reports", value: "2,847", icon: MapPin, change: "+12%" },
    { label: "Pending Issues", value: "543", icon: AlertTriangle, change: "-8%" },
    { label: "In Progress", value: "401", icon: Clock, change: "+5%" },
    { label: "Resolved Today", value: "23", icon: CheckCircle2, change: "+15%" },
  ];

  const mockIssues = [
    {
      id: "2024-0156",
      type: "Pothole",
      status: "In Progress",
      urgency: "High",
      location: "Main St & 1st Ave",
      reportedDate: "2024-01-15",
      assignedTo: "Street Maintenance",
      reporter: "John Smith"
    },
    {
      id: "2024-0155", 
      type: "Broken Streetlight",
      status: "Pending",
      urgency: "Medium",
      location: "Park Avenue",
      reportedDate: "2024-01-14",
      assignedTo: "Unassigned",
      reporter: "Sarah Johnson"
    },
    {
      id: "2024-0154",
      type: "Graffiti",
      status: "Resolved",
      urgency: "Low",
      location: "City Hall Building",
      reportedDate: "2024-01-13",
      assignedTo: "Sanitation",
      reporter: "Mike Wilson"
    },
  ];

  const departments = [
    "Street Maintenance",
    "Sanitation", 
    "Public Works",
    "Parks & Recreation",
    "Traffic Management"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-success text-white";
      case "In Progress":
        return "bg-warning text-white";
      case "Pending":
        return "bg-muted text-foreground";
      default:
        return "bg-muted text-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-destructive text-white";
      case "Medium":
        return "bg-warning text-white";
      default:
        return "bg-muted text-foreground";
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
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Badge className="bg-primary text-white">Admin</Badge>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage community issues and track department performance.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-success mr-1" />
                      <span className="text-sm text-success">{stat.change}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="issues">Issue Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="space-y-6">
            {/* Filters */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span>Filter Issues</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search issues..." 
                      className="pl-10"
                    />
                  </div>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Urgency</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Issues Table */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>All Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIssues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-medium">{issue.id}</TableCell>
                        <TableCell>{issue.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getUrgencyColor(issue.urgency)}>
                            {issue.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>{issue.location}</TableCell>
                        <TableCell>{issue.assignedTo}</TableCell>
                        <TableCell>{issue.reporter}</TableCell>
                        <TableCell>{issue.reportedDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm">Assign</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Resolution Time Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Chart placeholder - Resolution time analytics</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Issue Types Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Chart placeholder - Issue type breakdown</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={dept} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{dept}</h4>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 50) + 10} active issues
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-success text-white">
                          {Math.floor(Math.random() * 40) + 60}% resolved
                        </Badge>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
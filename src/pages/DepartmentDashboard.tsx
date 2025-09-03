import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Camera,
  Upload,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DepartmentDashboard = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [progressNote, setProgressNote] = useState("");
  const { toast } = useToast();
  
  const stats = [
    { label: "Assigned to Me", value: "24", icon: Users, color: "bg-primary" },
    { label: "In Progress", value: "12", icon: Clock, color: "bg-warning" },
    { label: "Completed Today", value: "8", icon: CheckCircle2, color: "bg-success" },
    { label: "Overdue", value: "3", icon: AlertTriangle, color: "bg-destructive" },
  ];

  const assignedIssues = [
    {
      id: "2024-0156",
      type: "Pothole",
      status: "In Progress",
      urgency: "High",
      location: "Main St & 1st Ave",
      reportedDate: "2024-01-15",
      reporter: "John Smith",
      description: "Large pothole causing traffic issues and potential vehicle damage",
      estimatedCompletion: "2024-01-18"
    },
    {
      id: "2024-0152", 
      type: "Pothole",
      status: "Assigned",
      urgency: "Medium",
      location: "Oak Street",
      reportedDate: "2024-01-12",
      reporter: "Sarah Johnson",
      description: "Small pothole near residential area",
      estimatedCompletion: "2024-01-20"
    },
    {
      id: "2024-0148",
      type: "Road Repair",
      status: "In Progress",
      urgency: "High",
      location: "Highway 101",
      reportedDate: "2024-01-10",
      reporter: "Mike Wilson",
      description: "Road surface deterioration affecting multiple lanes",
      estimatedCompletion: "2024-01-25"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-white";
      case "In Progress":
        return "bg-warning text-white";
      case "Assigned":
        return "bg-primary text-white";
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

  const handleUpdateProgress = () => {
    toast({
      title: "Progress Updated",
      description: "Issue status has been updated successfully.",
    });
    setSelectedIssue(null);
    setProgressNote("");
    setUpdateStatus("");
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
              <Badge className="bg-warning text-white">Street Maintenance Dept</Badge>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Department Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your assigned issues and update progress status.
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
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assigned Issues */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>My Assigned Issues</span>
            </CardTitle>
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
                  <TableHead>Reporter</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedIssues.map((issue) => (
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
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{issue.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{issue.reporter}</TableCell>
                    <TableCell>{issue.estimatedCompletion}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm"
                            onClick={() => setSelectedIssue(issue.id)}
                          >
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Update Issue Progress</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">Issue Details</label>
                              <div className="bg-muted p-3 rounded">
                                <p className="font-medium">{issue.type} - {issue.id}</p>
                                <p className="text-sm text-muted-foreground">{issue.location}</p>
                                <p className="text-sm mt-1">{issue.description}</p>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">Update Status</label>
                              <Select value={updateStatus} onValueChange={setUpdateStatus}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="requires-materials">Requires Materials</SelectItem>
                                  <SelectItem value="on-hold">On Hold</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">Progress Notes</label>
                              <Textarea
                                value={progressNote}
                                onChange={(e) => setProgressNote(e.target.value)}
                                placeholder="Add notes about progress, materials needed, completion details, etc."
                                className="min-h-[80px]"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">Upload Progress Photos</label>
                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                                <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  Upload before/after photos
                                </p>
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  className="hidden"
                                  id="progress-photos"
                                />
                                <label htmlFor="progress-photos">
                                  <Button size="sm" variant="outline" className="mt-2">
                                    <Camera className="h-4 w-4 mr-2" />
                                    Choose Files
                                  </Button>
                                </label>
                              </div>
                            </div>

                            <div className="flex space-x-2 pt-4">
                              <Button 
                                onClick={handleUpdateProgress}
                                className="flex-1 bg-gradient-to-r from-primary to-primary-hover"
                              >
                                Update Progress
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Request Time Extension
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Request Additional Resources
              </Button>
              <Button className="w-full" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Safety Concern
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Issues Completed</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On-Time Completion</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Completed pothole repair on Elm St</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span>Started work on Main St issue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span>New high-priority assignment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;
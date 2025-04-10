
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getComplaintsByTeam, getTeamById, TeamInfo, UserRole } from '@/lib/mockData';
import ComplaintTable from '@/components/ComplaintTable';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Mail, 
  Users, 
  AlertCircle, 
  ArrowLeft,
  Clock,
  CheckCircle,
} from 'lucide-react';

// Map from URL param to user role
const teamRoleMap: Record<string, UserRole> = {
  'team-customer-care': 'customer-care',
  'team-technical': 'technical',
  'team-billing': 'billing',
  'team-logistics': 'logistics',
};

// Map from team ID to color
const teamColorMap: Record<string, string> = {
  'team-customer-care': 'bg-teal-500',
  'team-technical': 'bg-orange-500',
  'team-billing': 'bg-purple-500',
  'team-logistics': 'bg-green-500',
};

const TeamDashboard = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamInfo | null>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  
  useEffect(() => {
    if (!teamId) return;
    
    // Get team info
    const teamInfo = getTeamById(teamId);
    if (!teamInfo) {
      navigate('/dashboard');
      return;
    }
    setTeam(teamInfo);
    
    // Get complaints for this team
    const teamRole = teamRoleMap[teamId];
    const teamComplaints = getComplaintsByTeam(teamRole);
    setComplaints(teamComplaints);
    
  }, [teamId, navigate]);
  
  // Check if user has access to this team
  const hasAccess = user?.role === 'main-admin' || 
                   (teamId && user?.role === teamRoleMap[teamId]);
  
  if (!hasAccess || !team) {
    navigate('/dashboard');
    return null;
  }
  
  // Calculate stats
  const totalComplaints = complaints.length;
  const newComplaints = complaints.filter(c => c.status === 'new').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length;

  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-4" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-md ${teamColorMap[teamId || '']} flex items-center justify-center mr-3`}>
                <Users className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold">{team.name} Dashboard</h1>
            </div>
            <p className="text-gray-600 mt-1">{team.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Complaints</CardDescription>
              <CardTitle className="text-3xl">{totalComplaints}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                <span>Team members: {team.members}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>New</CardDescription>
              <CardTitle className="text-3xl">{newComplaints}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                <span>Waiting for response</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-3xl">{inProgressComplaints}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4 text-orange-500" />
                <span>Being worked on</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Resolved</CardDescription>
              <CardTitle className="text-3xl">{resolvedComplaints}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                <span>Successfully completed</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Team Complaints</h2>
        <ComplaintTable complaints={complaints} teamView={true} />
      </div>
    </Layout>
  );
};

export default TeamDashboard;

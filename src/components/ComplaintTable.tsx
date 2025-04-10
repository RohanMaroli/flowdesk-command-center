
import { useState } from 'react';
import { Complaint } from '@/lib/mockData';
import { 
  MessageSquare, 
  Mail, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  ChevronDown,
  Search
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ComplaintTableProps {
  complaints: Complaint[];
  teamView?: boolean;
}

const ComplaintTable: React.FC<ComplaintTableProps> = ({ complaints, teamView = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);

  // Apply filters
  const filteredComplaints = complaints.filter(complaint => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = !statusFilter || complaint.status === statusFilter;
    
    // Source filter
    const matchesSource = !sourceFilter || complaint.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  // Status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'in-progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search complaints..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {statusFilter ? getStatusText(statusFilter) : 'Status'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('new')}>
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('in-progress')}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('resolved')}>
                  Resolved
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  {sourceFilter === 'whatsapp' ? 'WhatsApp' : 
                   sourceFilter === 'email' ? 'Email' : 'Source'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSourceFilter(null)}>
                  All Sources
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter('whatsapp')}>
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter('email')}>
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              {!teamView && <TableHead>Team</TableHead>}
              <TableHead>Assigned To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={teamView ? 8 : 9} className="text-center py-6 text-gray-500">
                  No complaints found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-mono text-xs">{complaint.id}</TableCell>
                  <TableCell className="font-medium">{complaint.customerName}</TableCell>
                  <TableCell className="max-w-xs truncate">{complaint.message}</TableCell>
                  <TableCell>
                    {complaint.source === 'whatsapp' ? (
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-green-600 mr-1" />
                        <span>WhatsApp</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-blue-600 mr-1" />
                        <span>Email</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(complaint.timestamp)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(complaint.status)}
                      <span>{getStatusText(complaint.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                    </span>
                  </TableCell>
                  {!teamView && (
                    <TableCell>
                      <span className="capitalize">{complaint.team.replace('-', ' ')}</span>
                    </TableCell>
                  )}
                  <TableCell>
                    {complaint.assignedTo || <span className="text-gray-400">-</span>}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComplaintTable;

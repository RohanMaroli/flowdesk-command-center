
export type UserRole = 'main-admin' | 'customer-care' | 'technical' | 'billing' | 'logistics';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export type TeamInfo = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  members: number;
  activeTickets: number;
  resolvedToday: number;
}

export type Complaint = {
  id: string;
  customerName: string;
  source: 'whatsapp' | 'email';
  message: string;
  timestamp: string;
  status: 'new' | 'in-progress' | 'resolved';
  assignedTo?: string;
  team: UserRole;
  priority: 'low' | 'medium' | 'high';
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@flowdesk.com',
    role: 'main-admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D47A1&color=fff',
  },
  {
    id: '2',
    name: 'Customer Care Rep',
    email: 'care@flowdesk.com',
    role: 'customer-care',
    avatar: 'https://ui-avatars.com/api/?name=Care+Rep&background=00897B&color=fff',
  },
  {
    id: '3',
    name: 'Technical Support',
    email: 'tech@flowdesk.com',
    role: 'technical',
    avatar: 'https://ui-avatars.com/api/?name=Tech+Support&background=E64A19&color=fff',
  },
  {
    id: '4',
    name: 'Billing Manager',
    email: 'billing@flowdesk.com',
    role: 'billing',
    avatar: 'https://ui-avatars.com/api/?name=Billing+Manager&background=7B1FA2&color=fff',
  },
  {
    id: '5',
    name: 'Logistics Coordinator',
    email: 'logistics@flowdesk.com',
    role: 'logistics',
    avatar: 'https://ui-avatars.com/api/?name=Logistics+Coordinator&background=689F38&color=fff',
  },
];

export const mockTeams: TeamInfo[] = [
  {
    id: 'team-customer-care',
    name: 'Customer Care',
    description: 'Handles general inquiries and customer satisfaction',
    icon: 'users',
    color: 'bg-teal-500',
    members: 8,
    activeTickets: 24,
    resolvedToday: 13,
  },
  {
    id: 'team-technical',
    name: 'Technical Support',
    description: 'Resolves technical issues and product questions',
    icon: 'wrench',
    color: 'bg-orange-500',
    members: 6,
    activeTickets: 18,
    resolvedToday: 9,
  },
  {
    id: 'team-billing',
    name: 'Billing Department',
    description: 'Manages payment issues and subscription inquiries',
    icon: 'credit-card',
    color: 'bg-purple-500',
    members: 4,
    activeTickets: 12,
    resolvedToday: 7,
  },
  {
    id: 'team-logistics',
    name: 'Logistics',
    description: 'Handles shipping, delivery and inventory inquiries',
    icon: 'truck',
    color: 'bg-green-500',
    members: 5,
    activeTickets: 15,
    resolvedToday: 8,
  },
];

export const mockComplaints: Complaint[] = [
  // Customer Care complaints
  {
    id: 'cc-1',
    customerName: 'John Smith',
    source: 'whatsapp',
    message: 'I need help with my recent order. Can someone assist me?',
    timestamp: '2025-04-10T09:30:00',
    status: 'new',
    team: 'customer-care',
    priority: 'medium',
  },
  {
    id: 'cc-2',
    customerName: 'Mary Johnson',
    source: 'email',
    message: 'I have a question about your return policy.',
    timestamp: '2025-04-10T08:45:00',
    status: 'in-progress',
    assignedTo: 'Sarah',
    team: 'customer-care',
    priority: 'low',
  },
  {
    id: 'cc-3',
    customerName: 'David Wilson',
    source: 'whatsapp',
    message: 'Your customer service is terrible! I want to speak to a manager!',
    timestamp: '2025-04-10T10:15:00',
    status: 'new',
    team: 'customer-care',
    priority: 'high',
  },
  
  // Technical Support complaints
  {
    id: 'tech-1',
    customerName: 'Alice Brown',
    source: 'email',
    message: 'My app keeps crashing whenever I try to upload photos.',
    timestamp: '2025-04-10T09:00:00',
    status: 'in-progress',
    assignedTo: 'Michael',
    team: 'technical',
    priority: 'medium',
  },
  {
    id: 'tech-2',
    customerName: 'Robert Lee',
    source: 'whatsapp',
    message: 'I cannot log into my account despite resetting my password.',
    timestamp: '2025-04-10T11:20:00',
    status: 'new',
    team: 'technical',
    priority: 'high',
  },
  
  // Billing complaints
  {
    id: 'bill-1',
    customerName: 'Emma Garcia',
    source: 'email',
    message: 'I was charged twice for my subscription this month.',
    timestamp: '2025-04-10T08:30:00',
    status: 'in-progress',
    assignedTo: 'Jennifer',
    team: 'billing',
    priority: 'high',
  },
  {
    id: 'bill-2',
    customerName: 'James Martinez',
    source: 'whatsapp',
    message: 'I would like to upgrade my subscription plan.',
    timestamp: '2025-04-10T13:45:00',
    status: 'new',
    team: 'billing',
    priority: 'low',
  },
  
  // Logistics complaints
  {
    id: 'log-1',
    customerName: 'Sophia Rodriguez',
    source: 'email',
    message: 'My package was supposed to arrive yesterday but it still shows as in transit.',
    timestamp: '2025-04-10T10:10:00',
    status: 'in-progress',
    assignedTo: 'Daniel',
    team: 'logistics',
    priority: 'medium',
  },
  {
    id: 'log-2',
    customerName: 'William Anderson',
    source: 'whatsapp',
    message: 'I received the wrong item in my delivery.',
    timestamp: '2025-04-10T14:30:00',
    status: 'new',
    team: 'logistics',
    priority: 'high',
  },
];

// Helper function to get complaints by team
export const getComplaintsByTeam = (team: UserRole): Complaint[] => {
  if (team === 'main-admin') {
    return mockComplaints;
  }
  return mockComplaints.filter(complaint => complaint.team === team);
};

// Helper function to get team by id
export const getTeamById = (id: string): TeamInfo | undefined => {
  return mockTeams.find(team => team.id === id);
};

// Login function for demo purposes
export const login = (email: string, password: string): User | null => {
  // For demo purposes, password is ignored and any valid email will work
  const user = mockUsers.find(u => u.email === email);
  return user || null;
};

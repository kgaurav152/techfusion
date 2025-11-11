/**
 * Core domain types for the TechFusion application
 */

export type UserRole = 'admin' | 'coordinator' | 'participant' | 'hospitality' | 'campusAmbassador' | 'schoolFacilitator';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  college?: string;
  department?: string;
  year?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  eventType: 'technical' | 'cultural' | 'workshop' | 'competition';
  date: Date;
  venue: string;
  capacity: number;
  registrations: number;
  image?: string;
  rules?: string[];
  coordinators?: string[];
  prizePool?: number;
  isActive: boolean;
  registrationDeadline?: Date;
  teamSize?: {
    min: number;
    max: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Participation {
  _id: string;
  userId: string;
  eventId: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  registrationDate: Date;
  teamName?: string;
  teamMembers?: string[];
  paymentStatus?: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  certificateIssued: boolean;
  certificateUrl?: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coordinator {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  events: string[];
  image?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CampusAmbassador {
  _id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  referralCode: string;
  referralCount: number;
  rewards?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Result {
  _id: string;
  eventId: string;
  participationId: string;
  position: number;
  prize?: string;
  certificate?: string;
  remarks?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchoolEvent {
  _id: string;
  schoolName: string;
  eventName: string;
  date: Date;
  coordinator: string;
  participants: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Certificate {
  _id: string;
  userId: string;
  eventId: string;
  participationId: string;
  certificateUrl: string;
  certificateId: string;
  issuedDate: Date;
  verificationCode: string;
}

export interface Query {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved' | 'closed';
  response?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stats {
  totalEvents: number;
  totalParticipants: number;
  totalCoordinators: number;
  totalRegistrations: number;
  activeEvents: number;
  pendingApprovals: number;
}

/**
 * Mock data for testing
 */

import type { User, Event, Participation, Coordinator } from '@/types'

export const mockUser: User = {
  _id: '123456789',
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  role: 'participant',
  college: 'Test College',
  department: 'Computer Science',
  year: '3',
  verified: true,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
}

export const mockAdmin: User = {
  ...mockUser,
  _id: 'admin123',
  email: 'admin@techfusion.com',
  role: 'admin',
}

export const mockEvent: Event = {
  _id: 'event123',
  title: 'Hackathon 2025',
  description: 'A 24-hour coding competition',
  category: 'Technical',
  eventType: 'competition',
  date: new Date('2025-01-15'),
  venue: 'Main Auditorium',
  capacity: 100,
  registrations: 45,
  image: 'https://example.com/hackathon.jpg',
  rules: ['Rule 1', 'Rule 2', 'Rule 3'],
  coordinators: ['coord1', 'coord2'],
  prizePool: 50000,
  isActive: true,
  registrationDeadline: new Date('2025-01-10'),
  teamSize: { min: 2, max: 4 },
  createdAt: new Date('2024-12-01'),
  updatedAt: new Date('2024-12-01'),
}

export const mockParticipation: Participation = {
  _id: 'participation123',
  userId: mockUser._id,
  eventId: mockEvent._id,
  status: 'approved',
  registrationDate: new Date('2025-01-05'),
  teamName: 'Code Warriors',
  teamMembers: ['member1', 'member2'],
  paymentStatus: 'completed',
  certificateIssued: false,
  createdAt: new Date('2025-01-05'),
  updatedAt: new Date('2025-01-05'),
}

export const mockCoordinator: Coordinator = {
  _id: 'coordinator123',
  name: 'John Coordinator',
  email: 'john@techfusion.com',
  phone: '9876543210',
  department: 'Computer Science',
  year: '4',
  events: [mockEvent._id],
  image: 'https://example.com/coordinator.jpg',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/john',
    github: 'https://github.com/john',
  },
  createdAt: new Date('2024-11-01'),
  updatedAt: new Date('2024-11-01'),
}

export const mockEvents: Event[] = [
  mockEvent,
  {
    ...mockEvent,
    _id: 'event456',
    title: 'Tech Talk Series',
    eventType: 'workshop',
    capacity: 50,
    registrations: 30,
  },
  {
    ...mockEvent,
    _id: 'event789',
    title: 'Cultural Night',
    eventType: 'cultural',
    capacity: 200,
    registrations: 150,
  },
]

// Mock data for development. Replace with real API calls when backend is ready.

export interface UserRecord {
  id: string
  name: string
  email: string
  phone: string
  unit: string
  role: 'RESIDENT' | 'SECURITY' | 'ADMIN'
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED'
  joinedAt: string
}

export interface UnitRecord {
  id: string
  unitNumber: string
  block: string
  type: 'FLAT' | 'DUPLEX' | 'PENTHOUSE'
  status: 'OCCUPIED' | 'VACANT'
  resident?: string
}

export interface VisitorRecord {
  id: string
  name: string
  phone: string
  purpose: string
  hostUnit: string
  hostName: string
  checkIn: string
  checkOut: string | null
  status: 'EXPECTED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'DENIED'
}

export interface Announcement {
  id: string
  title: string
  body: string
  priority: 'LOW' | 'NORMAL' | 'URGENT'
  createdAt: string
  author: string
}

export const mockUsers: UserRecord[] = [
  { id: '1', name: 'Adebayo Ogunleye', email: 'adebayo@mail.com', phone: '08012345678', unit: 'A-101', role: 'RESIDENT', status: 'ACTIVE', joinedAt: '2025-10-15' },
  { id: '2', name: 'Chidinma Eze', email: 'chidinma@mail.com', phone: '08098765432', unit: 'B-204', role: 'RESIDENT', status: 'ACTIVE', joinedAt: '2025-11-02' },
  { id: '3', name: 'Emeka Nwankwo', email: 'emeka@mail.com', phone: '07033334444', unit: 'C-305', role: 'RESIDENT', status: 'PENDING', joinedAt: '2026-05-20' },
  { id: '4', name: 'Fatimah Bello', email: 'fatimah@mail.com', phone: '09011112222', unit: 'A-102', role: 'RESIDENT', status: 'ACTIVE', joinedAt: '2025-09-01' },
  { id: '5', name: 'Ibrahim Musa', email: 'ibrahim@mail.com', phone: '08055556666', unit: '-', role: 'SECURITY', status: 'ACTIVE', joinedAt: '2025-08-10' },
  { id: '6', name: 'Ngozi Okoro', email: 'ngozi@mail.com', phone: '07077778888', unit: 'D-401', role: 'RESIDENT', status: 'SUSPENDED', joinedAt: '2025-12-05' },
  { id: '7', name: 'Olu Adeyemi', email: 'olu@mail.com', phone: '08199990000', unit: 'B-201', role: 'RESIDENT', status: 'ACTIVE', joinedAt: '2026-01-10' },
  { id: '8', name: 'Samuel Tunde', email: 'samuel@mail.com', phone: '09044443333', unit: '-', role: 'SECURITY', status: 'ACTIVE', joinedAt: '2026-02-14' },
]

export const mockUnits: UnitRecord[] = [
  { id: '1', unitNumber: 'A-101', block: 'Block A', type: 'FLAT', status: 'OCCUPIED', resident: 'Adebayo Ogunleye' },
  { id: '2', unitNumber: 'A-102', block: 'Block A', type: 'FLAT', status: 'OCCUPIED', resident: 'Fatimah Bello' },
  { id: '3', unitNumber: 'A-103', block: 'Block A', type: 'DUPLEX', status: 'VACANT' },
  { id: '4', unitNumber: 'B-201', block: 'Block B', type: 'FLAT', status: 'OCCUPIED', resident: 'Olu Adeyemi' },
  { id: '5', unitNumber: 'B-204', block: 'Block B', type: 'FLAT', status: 'OCCUPIED', resident: 'Chidinma Eze' },
  { id: '6', unitNumber: 'C-305', block: 'Block C', type: 'PENTHOUSE', status: 'OCCUPIED', resident: 'Emeka Nwankwo' },
  { id: '7', unitNumber: 'C-306', block: 'Block C', type: 'FLAT', status: 'VACANT' },
  { id: '8', unitNumber: 'D-401', block: 'Block D', type: 'DUPLEX', status: 'OCCUPIED', resident: 'Ngozi Okoro' },
  { id: '9', unitNumber: 'D-402', block: 'Block D', type: 'FLAT', status: 'VACANT' },
  { id: '10', unitNumber: 'D-403', block: 'Block D', type: 'FLAT', status: 'VACANT' },
]

export const mockVisitors: VisitorRecord[] = [
  { id: '1', name: 'John Doe', phone: '08011112222', purpose: 'Delivery (Jumia)', hostUnit: 'A-101', hostName: 'Adebayo Ogunleye', checkIn: '2026-05-27T09:30:00', checkOut: '2026-05-27T09:45:00', status: 'CHECKED_OUT' },
  { id: '2', name: 'Grace Umeh', phone: '07033334444', purpose: 'Family Visit', hostUnit: 'B-204', hostName: 'Chidinma Eze', checkIn: '2026-05-27T10:15:00', checkOut: null, status: 'CHECKED_IN' },
  { id: '3', name: 'Ahmed Yakubu', phone: '09055556666', purpose: 'Plumber', hostUnit: 'A-102', hostName: 'Fatimah Bello', checkIn: '2026-05-27T08:00:00', checkOut: '2026-05-27T11:30:00', status: 'CHECKED_OUT' },
  { id: '4', name: 'Mary Johnson', phone: '08077778888', purpose: 'Meeting', hostUnit: 'D-401', hostName: 'Ngozi Okoro', checkIn: '', checkOut: null, status: 'EXPECTED' },
  { id: '5', name: 'Unknown Person', phone: '07099990000', purpose: 'Unverified', hostUnit: 'C-305', hostName: 'Emeka Nwankwo', checkIn: '2026-05-27T12:00:00', checkOut: null, status: 'DENIED' },
  { id: '6', name: 'Tunde Bakare', phone: '08022223333', purpose: 'Electrician', hostUnit: 'B-201', hostName: 'Olu Adeyemi', checkIn: '', checkOut: null, status: 'EXPECTED' },
]

export const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Water Supply Maintenance', body: 'There will be a scheduled water supply interruption on May 30th from 9 AM to 2 PM for maintenance work on the central pump. Please store water ahead of time.', priority: 'URGENT', createdAt: '2026-05-26T14:00:00', author: 'Estate Admin' },
  { id: '2', title: 'Monthly General Meeting', body: 'The monthly estate general meeting will hold on June 1st at the community hall by 5 PM. All residents are encouraged to attend.', priority: 'NORMAL', createdAt: '2026-05-25T10:30:00', author: 'Estate Admin' },
  { id: '3', title: 'New Recycling Program', body: 'We are introducing a new waste recycling program starting June 5th. Recycling bins will be placed at designated points. Details will follow.', priority: 'LOW', createdAt: '2026-05-24T16:00:00', author: 'Estate Admin' },
]

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: string | null;
  propTitle: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
  message?: string;
}

export const sampleInquiries: Inquiry[] = [
  { id: 'inq-1', name: 'Rajesh Kumar', phone: '+91-98765-12345', email: 'rajesh@example.com', property: 'prop-001', propTitle: 'Luxury 4BHK Villa with Private Pool', date: '2025-06-27T10:30:00Z', status: 'new', message: 'I am interested in scheduling a property visit this weekend. Please call me back.' },
  { id: 'inq-2', name: 'Priya Sharma', phone: '+91-98765-23456', email: 'priya@example.com', property: 'prop-003', propTitle: 'Commercial Office Space – 5000 sqft', date: '2025-06-26T14:15:00Z', status: 'contacted', message: 'Looking for lease terms and maintenance details.' },
  { id: 'inq-3', name: 'Amit Patel', phone: '+91-98765-34567', email: '', property: null, propTitle: 'General Inquiry (Buy Residential)', date: '2025-06-25T09:45:00Z', status: 'closed', message: 'Seeking 3BHK options in Pune under 1 Crore.' },
  { id: 'inq-4', name: 'Sneha Gupta', phone: '+91-98765-45678', email: 'sneha@example.com', property: 'prop-007', propTitle: 'Penthouse with Panoramic City View', date: '2025-06-24T16:20:00Z', status: 'contacted', message: 'Is home loan assistance available for this property?' },
  { id: 'inq-5', name: 'Vikram Singh', phone: '+91-98765-56789', email: 'vikram@example.com', property: 'proj-001', propTitle: 'HK Skyline Residences', date: '2025-06-23T11:00:00Z', status: 'new', message: 'Requesting brochure and payment plan details.' },
];

export interface Project {
  id: string;
  name: string;
  type: string;
  status: 'ongoing' | 'completed';
  location: string;
  city: string;
  progress?: number;
  expectedCompletion?: string;
  completedDate?: string;
  totalUnits?: number;
  soldUnits?: number;
  startingPrice: number;
  priceUnit: string;
  description: string;
  highlights: string[];
  images: string[];
  testimonial?: string;
  testimonialAuthor?: string;
}

export const sampleProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'HK Skyline Residences',
    type: 'Residential Township',
    status: 'ongoing',
    location: 'Sector 65, Gurugram, Haryana',
    city: 'Gurugram',
    progress: 68,
    expectedCompletion: 'December 2026',
    totalUnits: 450,
    soldUnits: 312,
    startingPrice: 6500000,
    priceUnit: '₹',
    description: 'HK Skyline Residences is a landmark residential township featuring 2, 3, and 4 BHK apartments with world-class amenities. Set across 12 acres with lush green landscapes, clubhouse, and smart home features.',
    highlights: ['450 Premium Apartments', '12 Acres Gated Campus', 'Olympic Size Pool', 'Rooftop Sky Deck', 'EV Charging Stations', 'Smart Security System'],
    images: ['/images/proj1-1.jpg', '/images/proj1-2.jpg'],
  },
  {
    id: 'proj-002',
    name: 'HK Business Park',
    type: 'Commercial Complex',
    status: 'ongoing',
    location: 'HITEC City, Hyderabad, Telangana',
    city: 'Hyderabad',
    progress: 42,
    expectedCompletion: 'June 2027',
    totalUnits: 120,
    soldUnits: 48,
    startingPrice: 8000000,
    priceUnit: '₹',
    description: 'A state-of-the-art commercial business park designed for modern enterprises. Features Grade-A office spaces, co-working zones, food court, rooftop lounge, and LEED-certified green building standards.',
    highlights: ['Grade-A Office Spaces', 'Co-Working Zones', 'LEED Certified', 'Data Center Ready', 'Rooftop Lounge', '500+ Parking Spots'],
    images: ['/images/proj2-1.jpg', '/images/proj2-2.jpg'],
  },
  {
    id: 'proj-003',
    name: 'HK Luxe Villas',
    type: 'Luxury Villas',
    status: 'ongoing',
    location: 'Lonavala, Maharashtra',
    city: 'Lonavala',
    progress: 85,
    expectedCompletion: 'March 2026',
    totalUnits: 30,
    soldUnits: 27,
    startingPrice: 18000000,
    priceUnit: '₹',
    description: 'Exclusive collection of 30 ultra-luxury private villas nestled in the scenic hills of Lonavala. Each villa features a private pool, butler quarters, and panoramic valley views.',
    highlights: ['30 Private Villas', 'Infinity Pools', 'Valley Views', 'Smart Home Automation', 'Organic Garden', 'Helipad Access'],
    images: ['/images/proj3-1.jpg', '/images/proj3-2.jpg'],
  },
  {
    id: 'proj-004',
    name: 'HK Green Township',
    type: 'Residential Township',
    status: 'completed',
    location: 'Wakad, Pune, Maharashtra',
    city: 'Pune',
    completedDate: 'March 2024',
    totalUnits: 350,
    soldUnits: 350,
    startingPrice: 4200000,
    priceUnit: '₹',
    description: 'HK Green Township is a successfully delivered eco-friendly residential project in Pune. The project received the Maharashtra Realty Excellence Award for Best Green Development.',
    highlights: ['350 Units Delivered', 'Zero-Waste Management', 'Solar Powered', 'Rainwater Harvesting', 'IGBC Certified', 'Award Winner'],
    images: ['/images/proj4-1.jpg', '/images/proj4-2.jpg'],
    testimonial: 'HK Realty delivered exactly what they promised — quality construction, on-time delivery, and full transparency. My family absolutely loves our home in HK Green Township.',
    testimonialAuthor: 'Priya & Ankit Sharma, Homeowners',
  },
  {
    id: 'proj-005',
    name: 'HK Metro Commerce',
    type: 'Mixed-Use Development',
    status: 'completed',
    location: 'Bandra West, Mumbai, Maharashtra',
    city: 'Mumbai',
    completedDate: 'August 2023',
    totalUnits: 80,
    soldUnits: 80,
    startingPrice: 15000000,
    priceUnit: '₹',
    description: 'A landmark mixed-use development in Bandra West combining luxury residences, retail boutiques, and corporate offices under one iconic tower. Fully sold out 8 months before completion.',
    highlights: ['Fully Sold Out', 'Iconic Tower Design', 'Luxury Residences', 'Retail Boutiques', 'Corporate Offices', 'Valet Parking'],
    images: ['/images/proj5-1.jpg'],
    testimonial: 'Investing in HK Metro Commerce was the best real estate decision I have made. Exceptional build quality and the returns have been outstanding.',
    testimonialAuthor: 'Rohit Jain, Investor & Businessman',
  },
  {
    id: 'proj-006',
    name: 'HK Industrial Hub',
    type: 'Industrial Park',
    status: 'completed',
    location: 'Bhiwandi, Mumbai, Maharashtra',
    city: 'Mumbai',
    completedDate: 'December 2022',
    totalUnits: 50,
    soldUnits: 50,
    startingPrice: 12000000,
    priceUnit: '₹',
    description: 'A fully operational industrial park housing 50 industrial units with state-of-the-art infrastructure, dedicated power substation, and excellent highway connectivity to JNPT port.',
    highlights: ['50 Industrial Units', 'Dedicated Power Substation', 'JNPT Connectivity', '24/7 Operations', 'Water Treatment Plant', 'ETP Compliant'],
    images: ['/images/proj6-1.jpg'],
    testimonial: 'HK Industrial Hub gave our manufacturing business the perfect foundation. Infrastructure quality is top-notch and fully compliant.',
    testimonialAuthor: 'Suresh Patel, MD – Patel Industries',
  },
];

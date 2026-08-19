export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  category: 'buyer' | 'investor' | 'seller' | 'commercial';
}

export const sampleTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh & Meena Kapoor',
    role: 'Home Buyers, Gurugram',
    rating: 5,
    text: 'HK Realty made our dream of owning a luxury villa a reality. From property search to documentation, every step was handled with utmost professionalism and transparency. We are thrilled with our new home!',
    avatar: '/images/testimonial1.jpg',
    category: 'buyer',
  },
  {
    id: 't2',
    name: 'Aditya Verma',
    role: 'Real Estate Investor, Mumbai',
    rating: 5,
    text: 'I have invested in 3 projects through HK Realty over 4 years. Every investment has delivered exceptional returns. Their market insights and investment advice are simply unmatched in the industry.',
    avatar: '/images/testimonial2.jpg',
    category: 'investor',
  },
  {
    id: 't3',
    name: 'Sunita Deshmukh',
    role: 'Property Seller, Pune',
    rating: 5,
    text: 'Selling my commercial property was stress-free thanks to HK Realty. They found the right buyer within 3 weeks and got me 15% above my asking price. Incredible team and results!',
    avatar: '/images/testimonial3.jpg',
    category: 'seller',
  },
  {
    id: 't4',
    name: 'Vikram Singh',
    role: 'CEO – TechSpace Solutions, Hyderabad',
    rating: 5,
    text: 'Setting up our office in Hyderabad was seamless with HK Realty. They understood our business requirements and found us the perfect commercial space in HITEC City. Highly recommend their commercial services.',
    avatar: '/images/testimonial4.jpg',
    category: 'commercial',
  },
  {
    id: 't5',
    name: 'Fatima & Omar Siddiqui',
    role: 'NRI Home Buyers, Dubai',
    rating: 5,
    text: 'As NRIs, we were skeptical about investing in India remotely. HK Realty provided complete virtual tours, handled all documentation, and we got the keys without a single visit. Absolutely trustworthy!',
    avatar: '/images/testimonial5.jpg',
    category: 'buyer',
  },
  {
    id: 't6',
    name: 'Deepak Malhotra',
    role: 'Land Banking Investor, Delhi',
    rating: 5,
    text: 'The land banking opportunities curated by HK Realty have given my portfolio a 40% appreciation in 2 years. Their research on high-growth locations is thorough and highly accurate.',
    avatar: '/images/testimonial6.jpg',
    category: 'investor',
  },
  {
    id: 't7',
    name: 'Ananya Sharma',
    role: 'First-time Home Buyer, Bangalore',
    rating: 5,
    text: 'As a first-time buyer, I was nervous about the whole process. HK Realty held my hand through every step — from loan assistance to registration. Could not have done it without them!',
    avatar: '/images/testimonial7.jpg',
    category: 'buyer',
  },
  {
    id: 't8',
    name: 'Rajan & Associates',
    role: 'Commercial Property Developer, Mumbai',
    rating: 5,
    text: 'We partnered with HK Realty for a joint development project and the experience was outstanding. Their team demonstrated excellent project management skills and delivered before schedule.',
    avatar: '/images/testimonial8.jpg',
    category: 'commercial',
  },
];

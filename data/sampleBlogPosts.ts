export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  coverImage: string;
  featured: boolean;
}

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'top-investment-locations-india-2025',
    title: 'Top 10 High-Growth Real Estate Investment Locations in India for 2025',
    excerpt: 'Discover the most promising real estate markets across India offering the highest ROI potential for investors in 2025 and beyond.',
    content: `India's real estate market continues to evolve rapidly, driven by urbanization, infrastructure development, and a growing middle class. Whether you're a seasoned investor or entering the market for the first time, identifying the right location is crucial for maximizing returns.

## 1. Hyderabad – The IT Corridor Giant
Hyderabad has emerged as one of India's strongest real estate markets, driven by its booming IT sector and infrastructure investments. Areas like HITEC City, Gachibowli, and Kokapet continue to see double-digit appreciation.

## 2. Pune – The Smart City Powerhouse
Pune's proximity to Mumbai, combined with its thriving IT and education sectors, makes it a top choice. Wakad, Hinjewadi, and Kharadi are particularly high-growth micro-markets.

## 3. Bengaluru – The Silicon Valley of India
Bengaluru remains India's top real estate destination for tech professionals. Whitefield, Sarjapur Road, and Devanahalli continue to attract premium investment.

## 4. Gurugram – The NCR Powerhouse
With continued infrastructure development and proximity to Delhi, Gurugram offers strong rental yields and capital appreciation, especially in Sectors 57-75.

## 5. Navi Mumbai – The Emerging Megacity
With the Navi Mumbai International Airport nearing completion, real estate prices in Panvel, Ulwe, and Dronagiri are set for significant appreciation.

Contact HK Realty today to explore curated investment opportunities in these high-growth markets.`,
    author: 'Haroon Khan',
    authorRole: 'Founder & CEO, HK Realty',
    category: 'Investment Insights',
    tags: ['Investment', 'India Real Estate', 'ROI', 'High Growth', '2025'],
    readTime: 8,
    publishedAt: '2025-01-20',
    coverImage: '/images/blog1.jpg',
    featured: true,
  },
  {
    id: 'blog-002',
    slug: 'home-loan-guide-first-time-buyers',
    title: 'The Complete Home Loan Guide for First-Time Buyers in India',
    excerpt: 'Everything you need to know about home loans — eligibility, types, documentation, and tips to get the best rate for your first home.',
    content: `Buying your first home is one of the most significant financial decisions of your life. Understanding the home loan process can save you lakhs of rupees and years of unnecessary stress.

## Understanding Home Loan Eligibility
Banks typically consider your age, income, employment stability, credit score, and existing liabilities. A CIBIL score above 750 significantly improves your chances of approval at lower interest rates.

## Types of Home Loans
- **Fixed Rate**: EMI remains constant throughout tenure. Better for long-term planning.
- **Floating Rate**: Linked to RBI repo rate. Generally lower initially but variable.
- **Pradhan Mantri Awas Yojana (PMAY)**: Government subsidy scheme for first-time buyers in EWS/LIG/MIG categories.

## Key Documents Required
- PAN Card and Aadhaar
- Salary slips (3-6 months)
- Bank statements (6 months)
- Form 16 / ITR (2 years)
- Property documents

## Tips to Get the Best Rate
1. Maintain a CIBIL score above 750
2. Reduce existing EMI obligations
3. Compare multiple lenders
4. Negotiate with your existing bank
5. Consider co-applicant to increase eligibility

HK Realty's home loan assistance team can help you navigate the entire process and connect you with the best lending partners.`,
    author: 'Salma Sheikh',
    authorRole: 'Senior Property Consultant, HK Realty',
    category: 'Buyer Guide',
    tags: ['Home Loan', 'First Time Buyer', 'PMAY', 'EMI', 'Mortgage'],
    readTime: 10,
    publishedAt: '2025-02-05',
    coverImage: '/images/blog2.jpg',
    featured: true,
  },
  {
    id: 'blog-003',
    slug: 'nri-real-estate-investment-india-guide',
    title: 'NRI Real Estate Investment in India: A Complete Guide',
    excerpt: 'A comprehensive guide for Non-Resident Indians (NRIs) looking to invest in Indian real estate — covering regulations, tax implications, and top opportunities.',
    content: `India's real estate sector holds immense appeal for NRIs, offering a combination of emotional connection to homeland and strong investment potential. Here's everything you need to know.

## Can NRIs Buy Property in India?
Yes! NRIs can freely purchase residential and commercial properties in India. However, agricultural land, farmhouses, and plantation properties require special RBI permission.

## Financing Options for NRIs
NRIs can avail home loans from Indian banks against their NRE/NRO income. Loan amounts can be up to 80% of property value with tenures up to 20 years.

## Tax Implications
- **TDS on rent**: 30% TDS applicable on rental income for NRIs
- **Long-term capital gains**: 20% LTCG with indexation benefits after 2 years
- **DTAA benefits**: India has Double Tax Avoidance Agreements with 90+ countries

## FEMA Regulations
Funds for purchase must come through normal banking channels (NRE/NRO accounts or direct remittance). Repatriation of sale proceeds is permitted within FEMA limits.

## Why Invest Now?
With India's GDP growth at 6-7%, urban infrastructure expansion, and rental yields of 3-5%, Indian real estate offers compelling returns for NRI investors.

HK Realty provides complete NRI investment support including virtual tours, power of attorney services, and end-to-end documentation.`,
    author: 'Haroon Khan',
    authorRole: 'Founder & CEO, HK Realty',
    category: 'NRI Investment',
    tags: ['NRI', 'Investment', 'FEMA', 'Tax', 'India Real Estate'],
    readTime: 12,
    publishedAt: '2025-03-12',
    coverImage: '/images/blog3.jpg',
    featured: false,
  },
  {
    id: 'blog-004',
    slug: 'vastu-tips-new-home',
    title: '10 Essential Vastu Tips for Your New Home',
    excerpt: 'Harness the ancient wisdom of Vastu Shastra to create a home that radiates positive energy, prosperity, and well-being for your family.',
    content: `Vastu Shastra, the ancient Indian science of architecture, has guided home design for thousands of years. Modern homebuyers increasingly seek Vastu-compliant homes for peace of mind and positive energy.

## 1. Main Entrance Direction
The main entrance should ideally face North, North-East, or East to welcome positive energy and prosperity into your home.

## 2. Master Bedroom Location
The master bedroom should be in the South-West corner of the house. The head while sleeping should point South.

## 3. Kitchen Placement
The kitchen is best placed in the South-East (Agni corner). The cook should face East while cooking for health and prosperity.

## 4. Puja Room
The North-East corner is considered the most auspicious for a prayer room or meditation space.

## 5. Staircase Direction
Staircases should be in the South, West, or South-West. Avoid North-East staircases as they're considered inauspicious.

## 6. Colors and Energy
- Living room: Light yellow, cream, or white
- Bedroom: Light blue, green, or pink
- Kitchen: Orange, red, or yellow

## 7. Water Bodies
Swimming pools, water tanks, and fountains should be in the North or North-East direction.

HK Realty's properties are designed keeping Vastu principles in mind, offering you homes that balance modern comfort with positive energy.`,
    author: 'Rahul Mehta',
    authorRole: 'Property Consultant, HK Realty',
    category: 'Home Buying Tips',
    tags: ['Vastu', 'Home Tips', 'New Home', 'Design', 'Well-being'],
    readTime: 6,
    publishedAt: '2025-04-08',
    coverImage: '/images/blog4.jpg',
    featured: false,
  },
];

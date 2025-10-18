# IP AI Landing Page

A modern, responsive landing page for an AI-powered Intellectual Property management platform with an integrated sales quotation widget.

## 🚀 Features

### Landing Page
- **Modern UI/UX Design** - Clean, professional interface with responsive design
- **Comprehensive Sections** - Hero, features, pricing, contact, and trusted partners
- **Interactive Components** - Smooth animations and hover effects
- **Mobile Responsive** - Optimized for all device sizes

### Sales Quotation Widget
- **Multi-Step Workflow** - Service → Country → Items → Quotation
- **Multi-Selection Support** - Select multiple items with cost breakdown
- **Real-time Pricing** - Dynamic cost calculation and display
- **Database Integration** - PostgreSQL backend with real data
- **PDF Generation** - Generate downloadable quotations
- **Enhanced UX** - Larger, more readable interface

### Technical Features
- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **PostgreSQL** - Robust database backend
- **Python Integration** - Backend API with Python scripts
- **API Routes** - RESTful API endpoints

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.6** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Radix UI** - Component primitives

### Backend
- **Next.js API Routes** - Server-side API
- **Python 3.9+** - Backend scripts
- **PostgreSQL** - Database
- **asyncpg** - Python PostgreSQL driver
- **dotenv** - Environment variables

### Development
- **npm/pnpm** - Package management
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- PostgreSQL database
- npm or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kejionglee/iphall-landing-page.git
   cd iphall-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

5. **Database setup**
   - Create a PostgreSQL database
   - The application will automatically create the `quotationlist` table
   - Sample data will be inserted on first run

6. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses a single table `quotationlist` with the following structure:

```sql
CREATE TABLE quotationlist (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    service text,
    country text,
    item text,
    "prof fee" integer,
    "official fee" integer,
    disbursement integer,
    currency text
);
```

### Sample Data
The database includes sample data for:
- **Services**: COPYRIGHT, PATENT, TRADEMARK, INDUSTRIAL DESIGN, PCT NATIONAL PHASE
- **Countries**: Malaysia, Singapore, Thailand, Indonesia, Laos, Cambodia
- **Items**: Various IP services with detailed pricing

## 🔌 API Endpoints

### Quotation API
- `GET /api/quotation/services` - Get all available services
- `GET /api/quotation/services/{service}/countries` - Get countries for a service
- `GET /api/quotation/services/{service}/countries/{country}/items` - Get items for service/country
- `GET /api/quotation/generate/{service}/{country}/{item}` - Generate quotation summary

### Health Check
- `GET /api/v1/health` - API health status

## 🎯 Usage

### Sales Quotation Widget

1. **Open Widget** - Click "Get Instant Quote" buttons on pricing or contact sections
2. **Select Service** - Choose from available IP services (COPYRIGHT, PATENT, etc.)
3. **Choose Country** - Select target jurisdiction
4. **Pick Items** - Select one or multiple services with detailed cost breakdown
5. **Generate Quotation** - Type "done" to proceed to quotation summary
6. **Download PDF** - Generate downloadable quotation document

### Widget Features
- **Multi-selection** - Add multiple items before proceeding
- **Cost Breakdown** - See professional fees, official fees, and disbursements
- **Real-time Updates** - Dynamic pricing based on selections
- **Responsive Design** - Works on desktop and mobile

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components
- Customize theme in `components/theme-provider.tsx`

### Content
- Edit component files in `components/` directory
- Update pricing in `components/pricing.tsx`
- Modify contact information in `components/contact.tsx`

### Database
- Add new services, countries, or items in `lib/database.py`
- Update pricing by modifying the `insert_sample_data()` function

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify** - Static site deployment
- **Railway** - Full-stack deployment with database
- **DigitalOcean** - VPS deployment

### Environment Variables
```env
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_API_URL=your_api_url
```

## 📁 Project Structure

```
ip-ai-landing/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sales-quotation-widget.tsx
│   ├── hero.tsx
│   ├── pricing.tsx
│   └── ...
├── lib/                  # Utility libraries
│   ├── database.py       # Database management
│   ├── quotation-data.ts # TypeScript interfaces
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── styles/              # Additional styles
└── README.md           # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: marketing@pintas-ip.com
- **Phone**: +603-7876 5050
- **Website**: [Pintas IP](https://pintas-ip.com)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for the IP industry**


# Luxe Doors - Premium Imported Wooden Doors

A modern e-commerce platform for luxury wooden doors, built with React, Express, and TypeScript.

![Luxe Doors]([Your banner image URL])

## 🌟 Features

- **Rich Product Catalog**: Browse through our extensive collection of premium wooden doors
- **Detailed Product Pages**: Complete specifications, installation guides, and warranty information
- **Interactive UI Components**: Modern, responsive design with dark mode support
- **Search & Filter**: Easy-to-use search functionality with advanced filtering options
- **Favorites System**: Save and manage your favorite door designs
- **Responsive Design**: Seamless experience across all devices
- **Real-time Updates**: Live product availability and pricing
- **Professional Theme**: Elegant, customizable UI with Shadcn/UI components

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query
- **Routing**: Wouter
- **Styling**: Tailwind CSS with custom theming
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Type Safety**: Zod validation

## 📂 Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/              # Backend Express application
│   ├── routes.ts        # API routes
│   └── storage.ts       # Database operations
└── shared/              # Shared TypeScript types
```

## 🔧 Configuration

The project uses various configuration files:
- `theme.json` - UI theme configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript configuration

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type-check TypeScript
- `npm run db:push` - Update database schema

## 🎨 UI Components

The project uses a comprehensive set of UI components from Shadcn/UI, including:
- Dialogs
- Navigation menus
- Cards
- Forms
- Tooltips
- And many more!

## 🔒 Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL database connection string
- `SESSION_SECRET` - Session encryption key
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- Project Lead: [Your Name]
- Frontend Developer: [Name]
- Backend Developer: [Name]
- UI/UX Designer: [Name]

## 📚 Managing the Catalogue

To add new items to the catalogue, follow these steps:

1. Navigate to `server/storage.ts`
2. Locate the `initializeSampleData` method
3. Add new door entries following this template:

```typescript
{
  name: "Your Door Name",
  description: "Detailed description of the door",
  price: 4500, // Price in USD
  priceCategory: "Premium", // Premium, Luxury, or Ultra-Luxury
  woodType: "Wood Type",
  style: "Door Style", // Contemporary, Classic, Mediterranean, Asian
  origin: "Country of Origin",
  dimensions: "36\" x 80\" x 2.25\"", // Width x Height x Thickness
  imageUrl: "https://your-main-image-url.jpg",
  additionalImages: [
    "https://additional-image-1.jpg",
    "https://additional-image-2.jpg"
  ],
  features: ["Feature 1", "Feature 2", "Feature 3"],
  details: "Extended technical details and craftsmanship information"
}
```

### Required Fields:
- `name`: Product name (string)
- `description`: Brief product description (string)
- `price`: Price in USD (number)
- `priceCategory`: Product tier (string)
- `woodType`: Type of wood used (string)
- `style`: Architectural style (string)
- `origin`: Country of manufacture (string)
- `dimensions`: Product dimensions (string)
- `imageUrl`: Main product image URL (string)
- `additionalImages`: Array of additional image URLs (string[])
- `features`: Array of product features (string[])
- `details`: Detailed product description (string)

### Image Guidelines:
- Main image: 800x1200px recommended
- Additional images: At least 800px wide
- Use high-quality, well-lit photographs
- Include detail shots and different angles

## 📞 Support

For support, please contact us at:
- Email: support@luxedoors.com
- Website: https://luxedoors.com

---

Made with ❤️ by the Luxe Doors Team

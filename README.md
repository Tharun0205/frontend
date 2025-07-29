# 🚀 StackPilot Frontend

Modern React/Next.js frontend application for the StackPilot observability platform.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Context + Custom Hooks
- **Charts:** Recharts
- **Icons:** Lucide React
- **Theme:** next-themes for dark/light mode
- **Real-time:** Socket.io Client

## 🚀 Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
src/
├── assets/                # Static assets (images, icons, etc.)
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── charts/           # Chart components
│   └── dashboard/        # Dashboard-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── services/             # API services
├── types/                # TypeScript type definitions
└── styles/               # Global styles
\`\`\`

## 🎨 Components

### Core Components
- `MetricsDashboard` - Main metrics visualization
- `AIInsights` - AI-powered recommendations
- `AlertCenter` - Alert management
- `HealthScores` - System health indicators
- `RouteMonitoring` - API endpoint monitoring

### UI Components
- All shadcn/ui components (Button, Card, etc.)
- Custom theme provider
- Notification system
- User profile management

## 🔧 Configuration

### Environment Variables
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000
NEXT_PUBLIC_APP_NAME=StackPilot
\`\`\`

### Theme Configuration
The app supports light/dark themes with system preference detection.

## 📊 Features

- ✅ Real-time metrics dashboard
- ✅ AI-powered insights
- ✅ Interactive charts and graphs
- ✅ Dark/light theme toggle
- ✅ Mobile-responsive design
- ✅ WebSocket real-time updates
- ✅ Alert management system
- ✅ User authentication
- ✅ Performance monitoring

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Docker
\`\`\`bash
docker build -t stackpilot-frontend .
docker run -p 3000:3000 stackpilot-frontend
\`\`\`

## 📚 Documentation

- [Component Documentation](./docs/components.md)
- [API Integration](./docs/api.md)
- [Theming Guide](./docs/theming.md)
- [Contributing](./docs/contributing.md)

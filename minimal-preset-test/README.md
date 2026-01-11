# minimal-preset-test
Minimal setup for simple applications
## 🚀 Tech Stack
This project was created with [KareTech Stack](https://github.com/kareemschultz/karetech-stack), an enhanced Better-T-Stack scaffold with modern tooling and DevOps built-in.
### Frontend
- **React 18** with TypeScript
- **TanStack Router** for file-based routing
- **TanStack Query** for server state management
- **Tailwind CSS** for styling
- **shadcn/ui** components (maia theme)
- **Vite** for lightning-fast development
### Backend
- **Hono.js** - Ultra-fast web framework
- **SQLite** database
- **Drizzle ORM** for type-safe database operations
- **oRPC** for type-safe API calls

- **Better Auth** with email providers
## 🛠️ Getting Started
### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js 18+
### Installation
1. Clone the repository:
```bash
git clone <your-repo-url>
cd minimal-preset-test
```
2. Install dependencies:
```bash
bun install
```
3. Set up your database:
```bash
cp .env.example .env
# Edit .env with your database credentials
bun db:generate
bun db:migrate
```
4. Start the development server:
```bash
bun dev
```
5. Open your browser to [http://localhost:5173](http://localhost:5173)
## 📜 Available Scripts
### Development
- `bun dev` - Start development server
- `bun build` - Build for production
- `bun preview` - Preview production build locally
- `bun clean` - Clean build artifacts
### Code Quality
- `bun typecheck` - Run TypeScript type checking
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint errors automatically
- `bun format` - Format code with Prettier
- `bun format:check` - Check code formatting
### Testing

- `bun test:unit` - Run unit tests with Vitest
- `bun test:unit:ui` - Run unit tests with Vitest UI

### Database
- `bun db:generate` - Generate Drizzle migrations
- `bun db:migrate` - Run database migrations
- `bun db:push` - Push schema changes (development)
- `bun db:studio` - Open Drizzle Studio
- `bun db:seed` - Seed database with sample data
## 📂 Project Structure
```
minimal-preset-test/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and configs
│   ├── routes/              # TanStack Router routes
│   ├── db/                  # Database schema and migrations
│   ├── auth/                # Authentication configuration
│   ├── api/                 # oRPC API routes
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point

├── __tests__/              # Unit tests

├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── package.json
```
## 🗄️ Database
This project uses SQLite with Drizzle ORM.
### Environment Variables
```env
DATABASE_URL=./local.db
```

## 🔐 Authentication
This project uses Better Auth for authentication with the following providers:
- email
### Environment Variables
```env
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:5173




```
## 🚀 Deployment
### Vercel (Recommended)
```bash
# Install Vercel CLI
bun add -g vercel
# Deploy
vercel
```
### Netlify
```bash
# Build the project
bun build
# Deploy the dist/ folder to Netlify
```
## 📚 Documentation
- [KareTech Stack](https://github.com/kareemschultz/karetech-stack) - Project scaffold
- [Better-T-Stack](https://better-t-stack.dev) - Base stack documentation
- [TanStack Router](https://tanstack.com/router) - Routing
- [TanStack Query](https://tanstack.com/query) - Server state management
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM
## 🤝 Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request
## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
---
Built with ❤️ using [KareTech Stack](https://github.com/kareemschultz/karetech-stack)
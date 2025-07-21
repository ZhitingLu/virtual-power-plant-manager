This is a MVP Virtual Power Plant Manager app with:

✅ MVP Scope
## 1. Feature && Stack	
 Add a device (API)	NestJS + TypeScript	DTOs, controllers, services
 Shared types	Monorepo, TS Paths	Cross-project type sharing
 Simple web UI	Next.js (App Router)	Client-side + API fetch
 Form validation	React Hook Form + Zod	Validation on client
 API integration	Fetch from Next to Nest	Full-stack type-safe flow


## 2. 📁 Monorepo Structure
virtual-power-plant-manager/
├─ apps/
│  ├─ api/         ← NestJS backend
│  └─ web/         ← Next.js frontend
├─ infra/
├─ packages/
│  └─ types/       ← Shared TypeScript types
├─ .github/workflows/
├─ tsconfig.base.json
├─ pnpm-workspace.yaml

## 3. How to Run It
### Install dependencies
pnpm install

### Build all packages
pnpm -r run build

### Start dev environments
cd apps/api && pnpm run start:dev
cd apps/web && pnpm run dev

### Deploy infrastructure
cd infra && pnpm cdk deploy
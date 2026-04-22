# Frontend Documentation (frontend-next)

Next.js 16 frontend for the PRABUDDHA 2026 platform.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zod validation

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file `frontend-next/.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

3. Start dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Scripts

- `npm run dev` start development server
- `npm run build` create production build
- `npm run start` run production server
- `npm run lint` run lint checks

## App Routes

- `/` home page
- `/about` about page
- `/events` events listing with filtering/search/sort
- `/register` user registration + event enrollment + optional ID upload
- `/login` user login
- `/contact` contact form + FAQ
- `/admin/login` admin authentication
- `/admin/dashboard` admin dashboard for stats, registrations, and query handling

Keyboard shortcut:

- `Ctrl + Shift + A` opens admin login.

## API Integration

All API calls are centralized in `src/lib/api.ts`.

Base URL:

- `NEXT_PUBLIC_API_BASE_URL`
- default fallback: `http://localhost:5000`

Main integrations:

- Event listing and categories
- User create/login
- Registration create/list
- File upload for student ID
- Query submit/list/respond/status update
- Admin login, stats, recent activity, registration list

## Validation Rules

Frontend uses Zod schemas from `src/lib/validation.ts`.

Highlights:

- Email must be valid and end with `.com`
- Phone must be a valid Indian mobile number
- Password minimum length: 6
- Query message minimum length: 10
- ID card upload types: PDF/PNG/JPG/JPEG
- ID card max size: 5 MB

## Authentication Storage

- User token key in localStorage: `user_token`
- Admin token key in localStorage: `admin_token`

## Build Notes

- Ensure backend CORS allows frontend origin.
- Ensure backend upload path (`/uploads`) is publicly reachable if using uploaded ID URLs in UI.
- For production, set `NEXT_PUBLIC_API_BASE_URL` to your backend public URL.

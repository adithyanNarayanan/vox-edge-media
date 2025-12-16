# Studio Booking Platform - Frontend

A premium podcast and video production studio booking platform built with Next.js and Redux. This is a frontend-only application that communicates with a separate backend API.

## Features

- **User Authentication**: Login and signup with JWT-based authentication
- **Studio Booking System**: Book podcast or video production studios with multiple packages
- **Admin Dashboard**: Manage bookings and view contact submissions
- **Contact Form**: Allow visitors to reach out with inquiries
- **Responsive Design**: Beautiful, mobile-first design with Tailwind CSS
- **State Management**: Redux Toolkit for centralized state management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui with Radix UI primitives
- **TypeScript**: Full type safety throughout the application
- **Icons**: Lucide React

## Prerequisites

This frontend application requires a backend API server. You need to set up a backend that implements the API endpoints documented below.

## Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
\`\`\`

## Getting Started

1. **Install dependencies:**

\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables:**

Create a `.env.local` file with your backend API URL (see above).

3. **Run the development server:**

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── admin/               # Admin dashboard
│   │   ├── bookings/        # Manage bookings
│   │   ├── messages/        # View messages
│   │   └── page.tsx         # Dashboard home
│   ├── booking/             # Booking flow
│   ├── contact/             # Contact page
│   ├── login/               # Login page
│   ├── pricing/             # Pricing page
│   ├── services/            # Services page
│   ├── signup/              # Signup page
│   ├── studios/             # Studios page
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── providers/           # Context providers
│   │   └── redux-provider.tsx
│   ├── header.tsx           # Site header
│   ├── footer.tsx           # Site footer
│   └── admin-nav.tsx        # Admin navigation
├── lib/                     # Utility functions
│   ├── api-config.ts        # API endpoints configuration
│   ├── redux/               # Redux store and slices
│   │   ├── store.ts         # Redux store configuration
│   │   ├── hooks.ts         # Typed Redux hooks
│   │   └── slices/          # Redux slices
│   │       ├── authSlice.ts
│   │       ├── bookingSlice.ts
│   │       ├── contactSlice.ts
│   │       └── adminSlice.ts
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
\`\`\`

## Redux State Management

The application uses Redux Toolkit for state management with the following slices:

- **authSlice**: User authentication (login, signup, logout, verify)
- **bookingSlice**: Studio bookings management
- **contactSlice**: Contact form submissions
- **adminSlice**: Admin dashboard data (stats, bookings, messages)

## Backend API Requirements

Your backend API must implement the following endpoints:

### Authentication Endpoints

#### POST /api/auth/signup
Create a new user account.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 XXXXX XXXXX",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 XXXXX XXXXX",
    "isAdmin": false
  }
}
\`\`\`

#### POST /api/auth/login
Authenticate user and create session.

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 XXXXX XXXXX",
    "isAdmin": false
  }
}
\`\`\`

#### POST /api/auth/logout
End user session.

**Response:**
\`\`\`json
{
  "message": "Logged out successfully"
}
\`\`\`

#### GET /api/auth/verify
Verify user session and return user data.

**Response:**
\`\`\`json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 XXXXX XXXXX",
    "isAdmin": false
  }
}
\`\`\`

### Booking Endpoints

#### POST /api/bookings
Create a new booking.

**Request Body:**
\`\`\`json
{
  "studioType": "podcast",
  "bookingDate": "2024-01-15",
  "timeSlot": "09:00-11:00",
  "duration": 2,
  "packageType": "pro",
  "totalPrice": 8000,
  "specialRequests": "Need extra microphones"
}
\`\`\`

**Response:**
\`\`\`json
{
  "booking": {
    "id": "booking_id",
    "userId": "user_id",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "studioType": "podcast",
    "bookingDate": "2024-01-15",
    "timeSlot": "09:00-11:00",
    "duration": 2,
    "packageType": "pro",
    "totalPrice": 8000,
    "specialRequests": "Need extra microphones",
    "status": "confirmed",
    "createdAt": "2024-01-10T10:00:00Z"
  }
}
\`\`\`

#### GET /api/bookings
Get all bookings for the current user.

**Response:**
\`\`\`json
{
  "bookings": [
    {
      "id": "booking_id",
      "userId": "user_id",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "studioType": "podcast",
      "bookingDate": "2024-01-15",
      "timeSlot": "09:00-11:00",
      "duration": 2,
      "packageType": "pro",
      "totalPrice": 8000,
      "status": "confirmed",
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
\`\`\`

### Contact Endpoints

#### POST /api/contact
Submit a contact form.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 XXXXX XXXXX",
  "message": "I have a question about booking..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Message received successfully"
}
\`\`\`

### Admin Endpoints

#### GET /api/admin/dashboard
Get dashboard statistics and recent bookings.

**Response:**
\`\`\`json
{
  "stats": {
    "totalBookings": 150,
    "pendingBookings": 12,
    "completedBookings": 120,
    "totalRevenue": 750000
  },
  "recentBookings": [
    {
      "id": "booking_id",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "studioType": "podcast",
      "bookingDate": "2024-01-15",
      "timeSlot": "09:00-11:00",
      "duration": 2,
      "totalPrice": 8000,
      "status": "confirmed",
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
\`\`\`

#### GET /api/admin/bookings
Get all bookings for admin view.

**Response:**
\`\`\`json
{
  "bookings": [
    {
      "id": "booking_id",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "studioType": "podcast",
      "bookingDate": "2024-01-15",
      "timeSlot": "09:00-11:00",
      "duration": 2,
      "totalPrice": 8000,
      "status": "confirmed",
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
\`\`\`

#### GET /api/admin/messages
Get all contact form submissions.

**Response:**
\`\`\`json
{
  "messages": [
    {
      "id": "message_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 XXXXX XXXXX",
      "message": "I have a question...",
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
\`\`\`

## Authentication

The application expects the backend to use HTTP-only cookies for session management. All authenticated requests will include credentials.

## Admin Access

To access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin), the backend must return `isAdmin: true` in the user object.

## Deployment

This application can be deployed to Vercel or any platform that supports Next.js:

1. **Deploy the frontend**:
   - Connect your GitHub repository
   - Add the `NEXT_PUBLIC_API_URL` environment variable
   - Deploy

2. **Ensure backend is deployed and accessible**

3. **Configure CORS on your backend** to allow requests from your frontend domain

## Development Notes

- All API calls use `credentials: 'include'` to send cookies
- Redux DevTools are enabled in development mode
- The application is fully typed with TypeScript
- Error handling is implemented for all API calls

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT

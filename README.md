# Kidney Health App - Frontend

A React-based web application for kidney stone detection using AI.

## Features

- User authentication (login/register)
- Image upload for kidney stone detection
- AI-powered prediction results
- Patient report management
- Profile management

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment to Vercel

### Environment Variables

Set the following environment variable in your Vercel dashboard:

1. Go to your project settings in Vercel
2. Navigate to Environment Variables
3. Add the following variable:

```
REACT_APP_API_BASE_URL=https://kidney-health-app.onrender.com
```

Replace the URL with your actual backend deployment URL.

### Build Settings

The default build settings should work fine:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Troubleshooting

If you encounter registration errors:

1. Check that your backend server is running and accessible
2. Verify the `REACT_APP_API_BASE_URL` environment variable is set correctly
3. Check the browser console for detailed error messages
4. Ensure CORS is properly configured on your backend

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   └── assets/        # Images and other assets
├── public/            # Static files
└── dist/             # Build output

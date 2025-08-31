# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your Laravel application.

## 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add your authorized redirect URIs:
   - For local development: `http://localhost:8000/google/callback`
   - For production: `https://yourdomain.com/google/callback`
8. Copy the Client ID and Client Secret

## 2. Environment Configuration

Add the following variables to your `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:8000/google/callback
```

For production, update the `GOOGLE_REDIRECT_URI` to your production domain.

## 3. Features Added

- **Google Login Button**: Added to both Login and Register pages
- **Google OAuth Controller**: Handles authentication flow
- **User Creation**: Automatically creates new users from Google accounts
- **Email Verification**: Google accounts are automatically verified
- **Seamless Integration**: Works with existing Laravel authentication

## 4. How It Works

1. User clicks "Continue with Google" button
2. Redirects to Google OAuth consent screen
3. User authorizes the application
4. Google redirects back to your callback URL
5. System creates or logs in the user
6. User is redirected to the dashboard

## 5. Security Notes

- Google accounts are automatically email-verified
- OAuth users get a random password (they can't use it to log in directly)
- The system uses Google's secure OAuth 2.0 flow
- All sensitive data is handled server-side

## 6. Testing

1. Start your Laravel development server
2. Visit `/login` or `/register`
3. Click "Continue with Google"
4. Complete the Google OAuth flow
5. You should be logged in and redirected to the dashboard

## 7. Troubleshooting

- **"Invalid redirect URI"**: Make sure your redirect URI in Google Console matches your `.env` file
- **"Client ID not found"**: Verify your `GOOGLE_CLIENT_ID` in the `.env` file
- **"Authentication failed"**: Check your `GOOGLE_CLIENT_SECRET` in the `.env` file
- **"Route not found"**: Make sure you've cleared your route cache: `php artisan route:clear`

# Firebase Setup Instructions for Echo Mental Health App

## 🔥 Step-by-Step Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name: `echo-mental-health` (or your preferred name)
4. Enable Google Analytics ✅
5. Choose your Google account

### 2. Enable Authentication
1. In Firebase Console → **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** ✅
5. Optionally enable **Google** for easier sign-up

### 3. Create Firestore Database
1. In Firebase Console → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll secure it later)
4. Select your region (closest to your users)

### 4. Get Your Config Keys
1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click the **Web** icon (`</>`)
4. Register app: "Echo Mental Health"
5. **Copy the config object** that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "echo-mental-health.firebaseapp.com",
  projectId: "echo-mental-health",
  storageBucket: "echo-mental-health.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
  measurementId: "G-ABC123DEF4"
};
```

### 5. Update Your .env File
Replace the values in `/prototype/.env` with your actual Firebase config:

```bash
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
```

### 6. Secure Your Database (Important!)
1. Go to **Firestore Database** → **Rules**
2. Copy the rules from `firestore.rules` file in your project
3. Click **Publish**

### 7. Test Your Setup
1. Restart your development server: `npm start`
2. Look for "✅ Firebase initialized successfully" in browser console
3. Try creating an account - you should see users in Firebase Console!

## 🎯 What You Get

✅ **User Authentication** - Sign up, login, password reset  
✅ **Secure Data Storage** - Assessment results, progress tracking  
✅ **Real-time Analytics** - User engagement insights  
✅ **Offline Support** - App works without Firebase too  
✅ **Privacy-First** - Users only see their own data  

## 💰 Cost Estimate

With GitHub Education package:
- **$0/month** for development (free tier + $200 credit)
- **~$1-5/month** for small-scale production use

## 🔧 Features Ready to Use

1. **User Accounts**: Sign up, login, profile management
2. **Assessment Tracking**: All quiz results saved per user
3. **Progress Analytics**: Track calming tool usage
4. **Data Security**: Each user only sees their own data
5. **Offline Mode**: Works even without Firebase

## 🚀 Next Steps After Setup

1. Test user registration
2. Complete a mental health assessment
3. Check Firebase Console to see data flowing in
4. Set up analytics goals
5. Consider adding push notifications later

## 🆘 Troubleshooting

- **"Invalid API key"**: Double-check your .env file values
- **"Permission denied"**: Update Firestore rules
- **"Firebase not found"**: Restart dev server after .env changes

Your app will work perfectly offline until Firebase is configured! 🎉

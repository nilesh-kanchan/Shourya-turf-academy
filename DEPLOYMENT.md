# Deployment Guide - Shourya Turf & Sports Academy

## Quick Deployment Checklist

### Pre-Deployment
- [ ] MongoDB Atlas account created
- [ ] Razorpay production keys obtained
- [ ] Twilio account configured
- [ ] Gmail app password generated
- [ ] Domain name purchased (optional)

## 1. Database Deployment (MongoDB Atlas)

### Steps:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/shourya_turf
   ```

## 2. Backend Deployment

### Option A: Render (Recommended - Free Tier)

1. **Create account at [Render](https://render.com/)**

2. **Create New Web Service:**
   - Connect GitHub repository
   - Select `backend` folder as root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables:**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_random_string
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy:** Click "Create Web Service"

5. **Note your backend URL:** `https://your-app.onrender.com`

### Option B: Railway

1. **Create account at [Railway](https://railway.app/)**
2. **New Project → Deploy from GitHub**
3. **Select backend folder**
4. **Add environment variables** (same as above)
5. **Deploy**

### Option C: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
cd backend
heroku create shourya-turf-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
# ... set all other variables

# Deploy
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a shourya-turf-api
git push heroku main
```

## 3. Frontend Deployment

### Option A: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Update production environment:**

Edit `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.onrender.com/api',
  razorpayKeyId: 'your_razorpay_key_id'
};
```

3. **Build and deploy:**
```bash
cd frontend
npm run build:prod
vercel --prod
```

4. **Configure Vercel:**
   - Framework Preset: Angular
   - Build Command: `npm run build:prod`
   - Output Directory: `dist/shourya-turf-app`

### Option B: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build:**
```bash
cd frontend
npm run build:prod
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist/shourya-turf-app
```

4. **Configure redirects** (create `frontend/src/_redirects`):
```
/*    /index.html   200
```

### Option C: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
cd frontend
firebase init hosting

# Build
npm run build:prod

# Deploy
firebase deploy --only hosting
```

## 4. Post-Deployment Configuration

### Update CORS
Update backend `FRONTEND_URL` environment variable with deployed frontend URL.

### Update Frontend API URL
Ensure `environment.prod.ts` has correct backend URL.

### Test Payment Gateway
Switch Razorpay from test mode to live mode in dashboard.

### Create Admin User
Connect to MongoDB Atlas and run:
```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@shouryaturf.com",
  role: "admin",
  isVerified: true,
  createdAt: new Date()
})
```

## 5. Custom Domain Setup

### Backend (Render/Railway)
1. Go to Settings → Custom Domain
2. Add your domain (e.g., api.shouryaturf.com)
3. Update DNS records as instructed

### Frontend (Vercel/Netlify)
1. Go to Domain Settings
2. Add custom domain (e.g., shouryaturf.com)
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: [Provided IP]
   
   Type: CNAME
   Name: www
   Value: [Provided URL]
   ```

## 6. SSL Certificate
Both Vercel and Render provide automatic SSL certificates. No additional configuration needed.

## 7. Monitoring & Logs

### Backend Logs
- **Render:** Dashboard → Logs tab
- **Railway:** Dashboard → Deployments → View Logs
- **Heroku:** `heroku logs --tail`

### Frontend Logs
- **Vercel:** Dashboard → Deployments → Function Logs
- **Netlify:** Dashboard → Deploys → Deploy Log

## 8. Environment-Specific Configurations

### Development
```
Backend: http://localhost:5000
Frontend: http://localhost:4200
```

### Staging (Optional)
```
Backend: https://staging-api.shouryaturf.com
Frontend: https://staging.shouryaturf.com
```

### Production
```
Backend: https://api.shouryaturf.com
Frontend: https://shouryaturf.com
```

## 9. Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: curl ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 10. Performance Optimization

### Backend
- Enable compression middleware
- Add Redis caching for frequently accessed data
- Use MongoDB indexes (already configured)

### Frontend
- Enable Angular production mode (already configured)
- Use lazy loading for routes
- Optimize images and assets

## 11. Security Checklist

- [ ] All environment variables secured
- [ ] JWT secret is strong and random
- [ ] MongoDB user has limited permissions
- [ ] CORS configured correctly
- [ ] HTTPS enabled on all endpoints
- [ ] Rate limiting implemented (optional)
- [ ] Input validation on all endpoints

## 12. Backup Strategy

### Database Backup (MongoDB Atlas)
- Automatic backups enabled by default
- Manual backup: Atlas Dashboard → Backup → Create Snapshot

### Code Backup
- Push to GitHub regularly
- Tag releases: `git tag v1.0.0`

## 13. Cost Estimation

### Free Tier (Suitable for MVP)
- MongoDB Atlas: Free (512MB)
- Render: Free (750 hours/month)
- Vercel: Free (100GB bandwidth)
- **Total: $0/month**

### Production Tier
- MongoDB Atlas: $9/month (2GB)
- Render: $7/month (512MB RAM)
- Vercel: Free or $20/month (Pro)
- Razorpay: 2% transaction fee
- Twilio: Pay as you go (~$0.01/SMS)
- **Total: ~$16-36/month + transaction fees**

## 14. Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Check network access settings

### Frontend can't reach backend
- Verify CORS settings
- Check API URL in environment.prod.ts
- Ensure backend is deployed and running

### Payment not working
- Switch Razorpay to live mode
- Verify API keys are production keys
- Check Razorpay dashboard for errors

### OTP not sending
- Verify email/SMS credentials
- Check service quotas (Twilio/Gmail)
- Review logs for error messages

## 15. Scaling Considerations

### When to Scale
- More than 1000 concurrent users
- Database size exceeds 2GB
- Response time > 2 seconds

### Scaling Options
- Upgrade MongoDB Atlas tier
- Add Redis caching layer
- Use CDN for static assets
- Implement load balancing
- Consider microservices architecture

---

**Deployment Complete! 🚀**

Your application is now live and ready to accept bookings!

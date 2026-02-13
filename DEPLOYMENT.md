# Deploying to Vercel

This guide will help you deploy your Valentine Universe project to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your MongoDB connection string
3. Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Visit Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"

3. **Import your repository**
   - Select your Git provider
   - Find and select your Valentine repository
   - Click "Import"

4. **Configure your project**
   - Framework Preset: Vite (should auto-detect)
   - Root Directory: `.` (leave as default)
   - Build Command: `npm run build` (should auto-fill)
   - Output Directory: `dist` (should auto-fill)

5. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following:
     - Name: `MONGODB_URI`
     - Value: `your-mongodb-connection-string`
   - Click "Add"

6. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-3 minutes)
   - Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - What's your project's name? valentine-universe
   - In which directory is your code located? ./

5. **Add environment variable**
   ```bash
   vercel env add MONGODB_URI
   ```
   - Enter your MongoDB connection string when prompted
   - Select all environments (Production, Preview, Development)

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Update API Endpoints in Your Code

If your frontend code has hardcoded API URLs (like `http://localhost:3001`), you'll need to update them to use relative URLs or environment variables:

```javascript
// Instead of:
const API_URL = 'http://localhost:3001/api';

// Use:
const API_URL = '/api';
```

### Testing Your Deployment

1. Visit your deployed URL
2. Test all features:
   - Menu navigation
   - Timeline loading
   - Wheel spinning
   - Letter viewing

### Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify build command is `npm run build`
- Check build logs for specific errors

### API Routes Not Working
- Verify `MONGODB_URI` environment variable is set
- Check API function logs in Vercel Dashboard
- Ensure MongoDB IP whitelist includes `0.0.0.0/0` (allow all) for Vercel

### MongoDB Connection Issues
- Go to MongoDB Atlas
- Click "Network Access"
- Add IP Address: `0.0.0.0/0` (allows connections from Vercel)
- Or add: `Allow Access from Anywhere`

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel list

# Remove a deployment
vercel remove [deployment-url]

# Open project in browser
vercel open
```

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

# 🚀 Render Deployment Guide

## Prerequisites
- MongoDB Atlas account with a database set up
- Render account
- Git repository pushed to GitHub

---

## 📦 Changes Made for Deployment

### 1. **Root package.json** (NEW)
Added root-level `package.json` to handle build from repository root.

### 2. **Removed Circular Dependency**
Removed `"chatbackend": "file:.."` from `backend/frontend/package.json` that was causing build to hang.

### 3. **Updated CORS Configuration**
Made CORS origin configurable via environment variable.

---

## 🔧 Render Configuration

### **Step 1: Create New Web Service**
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `Mern_chat_dep` repository

### **Step 2: Configure Build Settings**

| Setting | Value |
|---------|-------|
| **Name** | mern-chat-app (or your choice) |
| **Root Directory** | (leave empty) |
| **Environment** | Node |
| **Region** | Your preferred region |
| **Branch** | master |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |

### **Step 3: Add Environment Variables**

Click **"Advanced"** → **"Add Environment Variable"**

**Required Variables:**

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp

# JWT Secret (generate a strong random string)
JWT_TOKEN=your_super_secret_random_jwt_token_here_at_least_32_chars

# Node Environment
NODE_ENV=production

# Port (Render sets this automatically, but you can specify)
PORT=10000

# Frontend URL (same as your Render app URL)
FRONTEND_URL=https://your-app-name.onrender.com

# Vite Backend URL (for frontend build)
VITE_BACKEND_URL=https://your-app-name.onrender.com
```

**Important:** Replace `your-app-name` with your actual Render service name!

---

## 🗄️ MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier available)
3. Create a database user
4. Get your connection string:
   - Click **"Connect"** → **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `chatapp`)

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/chatapp?retryWrites=true&w=majority
```

5. **Whitelist Render IPs:**
   - Go to **"Network Access"**
   - Click **"Add IP Address"**
   - Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

---

## 🔐 Generate JWT Secret

Run this in your terminal to generate a secure random string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_TOKEN`.

---

## 🐛 Troubleshooting

### **Build Fails or Hangs**

**Problem:** Build command gets stuck at "npm install"

**Solutions:**
1. Check for circular dependencies in `package.json` files
2. Make sure `backend/frontend/package.json` doesn't have `"chatbackend": "file:.."`
3. Clear Render cache: Settings → Build & Deploy → Clear build cache

### **"Cannot connect to MongoDB"**

**Solutions:**
1. Verify `MONGODB_URI` is correct
2. Check MongoDB Atlas network access allows Render IPs (0.0.0.0/0)
3. Ensure database user credentials are correct

### **Socket.io Connection Fails**

**Solutions:**
1. Make sure `FRONTEND_URL` matches your Render app URL
2. Check CORS settings in `backend/socket/server.js`
3. Ensure `VITE_BACKEND_URL` is set correctly

### **Frontend Shows Blank Page**

**Solutions:**
1. Check browser console for errors
2. Verify `VITE_BACKEND_URL` environment variable is set during build
3. Check that `NODE_ENV=production` is set

### **JWT Token Issues**

**Solutions:**
1. Make sure `JWT_TOKEN` environment variable is set
2. Clear browser cookies
3. Check that `httpOnly` is set correctly in `backend/jwt/generateToken.js`

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] Network access configured (0.0.0.0/0)
- [ ] All environment variables added to Render
- [ ] `FRONTEND_URL` matches Render app URL
- [ ] `VITE_BACKEND_URL` matches Render app URL
- [ ] Code pushed to GitHub
- [ ] Render build completed successfully
- [ ] App is accessible via Render URL
- [ ] Login/Signup works
- [ ] Real-time messaging works
- [ ] Socket.io connection established

---

## 🔄 Redeployment

After making code changes:

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin master
   ```

2. Render will automatically redeploy (if auto-deploy is enabled)

3. Or manually deploy:
   - Go to Render Dashboard
   - Select your service
   - Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check MongoDB Atlas logs
3. Review this troubleshooting guide
4. Check [Render Documentation](https://render.com/docs)

---

## 🎉 Success!

Once deployed, your app will be available at:
```
https://your-app-name.onrender.com
```

**Note:** Free tier services may spin down after inactivity. First request after inactivity may take 30-60 seconds.

---

## 📊 Performance Optimization (Optional)

For better performance on Render:

1. **Upgrade to Paid Plan** - No cold starts
2. **Add Redis** - For session management
3. **Enable HTTP/2** - Faster page loads
4. **Add CDN** - CloudFlare for static assets
5. **Database Indexing** - Optimize MongoDB queries

---

Good luck with your deployment! 🚀


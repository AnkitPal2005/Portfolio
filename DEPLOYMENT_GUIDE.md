# Portfolio Deployment Guide

## 🚀 Deploy on Vercel (Recommended - FREE)

### Steps:

1. **GitHub Repository banao:**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   ```

2. **GitHub pe push karo:**
   - GitHub pe jao aur new repository banao (e.g., "portfolio")
   - Commands run karo:
   ```bash
   git remote add origin https://github.com/AnkitPal2005/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. **Vercel pe deploy karo:**
   - https://vercel.com pe jao
   - "Sign up with GitHub" karo
   - "Import Project" click karo
   - Apni portfolio repository select karo
   - "Deploy" button click karo
   - Done! 2-3 minutes mein live ho jayega

### Vercel Features:
✅ FREE forever
✅ Automatic HTTPS
✅ Custom domain support
✅ Auto-deploy on git push
✅ Lightning fast CDN

---

## 🌐 Option 2: Netlify (Also FREE)

### Steps:

1. **Build karo:**
   ```bash
   npm run build
   ```

2. **Netlify pe jao:**
   - https://netlify.com pe jao
   - "Sign up with GitHub" karo
   - "Add new site" > "Import an existing project"
   - GitHub repository select karo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - "Deploy" click karo

---

## 📦 Option 3: GitHub Pages (FREE)

### Steps:

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **package.json mein add karo:**
   ```json
   {
     "homepage": "https://AnkitPal2005.github.io/portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy karo:**
   ```bash
   npm run deploy
   ```

4. **GitHub Settings:**
   - Repository > Settings > Pages
   - Source: "gh-pages" branch select karo
   - Save karo

---

## 🎯 Quick Commands

### For Vercel (Easiest):
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

### For Netlify:
```bash
# Install Netlify CLI (optional)
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 📝 Important Notes:

1. **Before deploying:**
   - Make sure `npm run build` works without errors
   - Test production build: `npm run preview`

2. **Custom Domain:**
   - Vercel/Netlify dono free custom domain support karte hain
   - Domain settings mein jao aur add karo

3. **Environment Variables:**
   - Agar koi API keys hain, toh platform ki settings mein add karo

---

## 🔥 Recommended: Vercel

**Why Vercel?**
- Fastest deployment (2 minutes)
- Best for React/Vite projects
- Automatic deployments on git push
- Free SSL certificate
- Global CDN
- Zero configuration needed

**Your live URL will be:**
`https://portfolio-ankitpal.vercel.app` (or similar)

---

## 🆘 Need Help?

If you face any issues:
1. Check build errors: `npm run build`
2. Check preview: `npm run preview`
3. Make sure all dependencies are installed: `npm install`

---

**Ready to deploy? Follow Vercel steps above! 🚀**

# How to Add Your Profile Photo

## Steps:

1. **Save your photo** as `profile.jpg` (or any name you prefer)

2. **Copy the photo** to this location:
   ```
   portfolio/public/images/profile.jpg
   ```

3. **If you use a different name or format**, update the path in `src/App.jsx`:
   ```jsx
   <img src="/images/your-photo-name.jpg" alt="Ankit Pal" className="profile-img" />
   ```

## Supported Formats:
- JPG/JPEG
- PNG
- WebP

## Recommended Size:
- Minimum: 400x400 pixels
- Recommended: 800x800 pixels
- Square aspect ratio (1:1) works best

## Current Setup:
The code is already configured to display your photo at `/images/profile.jpg`

Just place your photo file in the `public/images/` folder and it will automatically appear! 🎉

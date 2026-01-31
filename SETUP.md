# 🚀 FocusBuddy Setup Guide

## Step 1: Install Dependencies

Run this command in your terminal:

```bash
npm install zustand react-native-mmkv react-native-reanimated expo-router expo-av expo-haptics lucide-react-native
```

## Step 2: Add Character Images

You need to add 8 PNG images to `assets/images/`:

### Required Files:
- `cat_idle.png`
- `cat_happy.png`
- `cat_sad.png`
- `cat_sleepy.png`
- `dog_idle.png`
- `dog_happy.png`
- `dog_sad.png`
- `dog_sleepy.png`

### Image Specs:
- Size: 512x512px recommended
- Format: PNG with transparent background
- Style: Cute, pastel-colored, minimalist

### Where to Get Images:
1. **Create your own** using tools like:
   - Midjourney
   - DALL-E
   - Stable Diffusion
   
2. **Use placeholder images** temporarily:
   - You can use emoji or simple colored circles as placeholders
   - The app will still work, just without custom characters

## Step 3: Configure Expo Router

The project is already set up with Expo Router. Just make sure your `app.json` includes:

```json
{
  "expo": {
    "scheme": "focusbuddy"
  }
}
```

## Step 4: Start the App

```bash
npx expo start
```

Then:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app

## Step 5: Test the Flow

1. **Onboarding**: Select a companion (Cat or Dog)
2. **Home Screen**: See your character and timer
3. **Start Focus**: Tap "Start Focus" button
4. **Focus Mode**: Timer counts down
5. **Completion**: See celebration screen with XP reward
6. **Profile**: Check your stats and level
7. **Shop**: Try unlocking new companions

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npx expo install --fix
```

### Reanimated not working
Make sure `babel.config.js` includes:
```js
plugins: ['react-native-reanimated/plugin']
```

Then clear cache:
```bash
npx expo start -c
```

### Images not loading
- Check file names match exactly (case-sensitive)
- Ensure images are in `assets/images/` folder
- Try restarting the dev server

## 📱 Testing on Real Device

1. Install Expo Go app from App Store / Play Store
2. Scan QR code from terminal
3. App will load on your device

## 🎨 Customization

### Change Colors
Edit `src/constants/theme.ts`:
```typescript
colors: {
  primary: {
    cat: '#YOUR_COLOR',
    dog: '#YOUR_COLOR',
  }
}
```

### Change Timer Duration
Edit `src/stores/useTimerStore.ts`:
```typescript
const WORK_DURATION = 25 * 60; // Change 25 to your preferred minutes
```

### Add New Companions
1. Add images to `assets/images/`
2. Update `imageMap` in `CharacterDisplay.tsx`
3. Add to shop in `shop.tsx`

## ✅ Next Steps

Once everything is working:
- [ ] Add your custom character images
- [ ] Customize colors to your brand
- [ ] Test on both iOS and Android
- [ ] Add sound effects (optional)
- [ ] Build for production

## 🆘 Need Help?

Check the main README.md for more details about:
- Project structure
- Design system
- Game mechanics
- Development workflow

Happy coding! 🎉

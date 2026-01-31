# 🎯 FocusBuddy - Gamified Pomodoro Focus Companion

A beautiful, gamified Pomodoro timer app with animated animal companions built with React Native and Expo.

## ✨ Features

- 🐱 **Animated Companions**: Choose between Cat, Dog, and unlock more!
- ⏱️ **Pomodoro Timer**: 25-minute focus sessions with breaks
- 🎮 **Gamification**: Earn XP, level up, and unlock new companions
- 🔥 **Streak Tracking**: Build daily focus habits
- 📊 **Progress Stats**: Track your focus time and sessions
- 💰 **Shop System**: Unlock premium companions with earned coins
- 🎨 **Beautiful UI**: Pastel colors, smooth animations, premium design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Add character images**:
   - Place your PNG character images in `assets/images/`
   - See `assets/images/README.md` for required files

3. **Start the development server**:
```bash
npm start
```

4. **Run on device**:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

## 📁 Project Structure

```
FocusBuddy/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation
│   │   ├── home.tsx         # Main dashboard
│   │   ├── profile.tsx      # User stats & progress
│   │   └── shop.tsx         # Companion shop
│   ├── focus.tsx            # Focus mode screen
│   ├── completion.tsx       # Session completion
│   └── index.tsx            # Onboarding
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives
│   │   └── character/       # Character components
│   ├── stores/              # Zustand state management
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   ├── constants/           # Theme & design tokens
│   └── types/               # TypeScript types
└── assets/
    └── images/              # Character sprites
```

## 🎨 Design System

### Colors
- **Primary**: Soft purple (#C9A9E9) and warm orange (#FFB84D)
- **Background**: Creamy white (#FFF8F0)
- **Accents**: Mint green, peach, soft yellow

### Typography
- Font sizes: 12px - 72px
- Weights: Regular, Medium, Semibold, Bold

### Spacing
- Base unit: 8px
- Scale: xs(4) → sm(8) → md(16) → lg(24) → xl(32) → xxl(48)

## 🔧 Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based)
- **State Management**: Zustand
- **Persistence**: react-native-mmkv
- **Animations**: react-native-reanimated v3
- **Icons**: lucide-react-native

## 📱 Screens

1. **Onboarding**: Character selection
2. **Home**: Timer dashboard with character
3. **Focus Mode**: Distraction-free timer
4. **Completion**: Celebration & rewards
5. **Profile**: Stats, level, and activity
6. **Shop**: Unlock new companions

## 🎮 Game Mechanics

- **XP System**: 25 XP per completed session
- **Leveling**: 100 XP per level (scales with level)
- **Currency**: 10 coins per session
- **Streak**: Daily focus habit tracking
- **Unlockables**: Premium companions (Panda: 500 coins, Fox: 750 coins)

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

### Adding New Companions

1. Add character images to `assets/images/`
2. Update `imageMap` in `src/components/character/CharacterDisplay.tsx`
3. Add to shop items in `app/(tabs)/shop.tsx`
4. Update types in `src/types/index.ts`

## 🎯 Roadmap

- [ ] Sound effects & ambient music
- [ ] Haptic feedback
- [ ] Dark mode support
- [ ] Custom timer durations
- [ ] Statistics graphs
- [ ] Achievements system
- [ ] Social features (leaderboards)
- [ ] More companions (Panda, Fox, Rabbit, etc.)

## 📝 License

MIT License - Feel free to use this project for learning or personal use!

## 🙏 Credits

Built with ❤️ using Expo and React Native

# 📦 Installation Commands

## Primary Installation (Use This)

```bash
npm install --legacy-peer-deps zustand react-native-mmkv react-native-reanimated expo-router expo-av expo-haptics lucide-react-native
```

## Why `--legacy-peer-deps`?

React 19.1.0 ile react-dom 19.2.4 arasında peer dependency uyumsuzluğu var. 
Bu flag ile npm eski davranışı kullanarak uyumsuzluğu görmezden gelir.

## Alternative (If Above Fails)

```bash
npm install --force zustand react-native-mmkv react-native-reanimated expo-router expo-av expo-haptics lucide-react-native
```

## After Installation

1. Clear cache and restart:
```bash
npx expo start -c
```

2. If you see "MMKV" TypeScript errors, they will disappear after:
   - Packages are installed
   - Dev server restarts

## Package Versions

The following will be installed:
- zustand: ^5.x (State management)
- react-native-mmkv: ^3.x (Fast storage)
- react-native-reanimated: ^3.x (Animations)
- expo-router: ^6.x (Navigation)
- expo-av: ^15.x (Audio)
- expo-haptics: ^14.x (Vibration)
- lucide-react-native: ^0.x (Icons)

## Troubleshooting

### If installation still fails:
1. Delete `node_modules` and `package-lock.json`
2. Run: `npm install --legacy-peer-deps`
3. Then install our packages

### If TypeScript errors persist:
- Restart VS Code
- Run: `npx expo start -c`

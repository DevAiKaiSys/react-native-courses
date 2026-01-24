# Welcome to your Expo app 👋

## Reference

[React Native Course for Beginners in 2025](https://www.youtube.com/watch?v=f8Z9JyB2EIE)

## run start

```bash
npx expo start
```

Restart and clear the JavaScript transformation caches

```bash
npx expo start --clear
```

## Install

[Nativewind](https://www.nativewind.dev/docs/getting-started/installation)

```bash
npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
```

following Installation step 2-end

note: change path on content of module.exports

```
// tailwind.config.js

module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
}
```
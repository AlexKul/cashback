# Cashback

Cashback is an Expo Router app for estimating a sports cashback bonus. The app uses a local cashback program JSON file, walks the user through a short calculator flow, and reveals the yearly projection with animated visual effects.

## What The App Contains

- A dark themed home screen with the Cashback logo, animated starburst, and a call to action.
- A bonus calculator screen with a two-step flow:
  - Select a bet type.
  - Enter the amount played per week.
- A result reveal screen that shows the projected yearly cashback amount, currency, bill animation, restart button, and an upsell message when a higher-rate bet type is available.
- Local program data in `assets/json/cashbackProgram.json`.
- MVVM-style separation for calculator behavior:
  - UI screens in `src/screens`.
  - Reusable UI components in `src/components`.
  - Calculator state and view data in `src/hooks/useCalculator.ts`.
  - Local data loading in `src/services/cashbackProgramService.ts`.
  - Calculator models in `src/models/calculator`.
  - Pure calculation helpers in `src/utils/calculatorUtils.ts`.
- Unit tests for calculator utilities in `tests/calculatorUtils.test.cjs`.

## Tech Stack

- Expo SDK 56
- React Native 0.85
- React 19
- Expo Router
- TypeScript
- Node's built-in test runner for utility tests

## Getting Started

This project is set up for an Expo development build. Expo Go is not the main target because the app includes native project folders and `expo-dev-client`.

Follow Expo's iOS Simulator development-build setup:

- Install Node.js 22.13.x or newer.
- Install Xcode from the Mac App Store.
- Open Xcode once so it can finish installing required components.
- Make sure an iOS Simulator is installed in Xcode.
- Install and log in to EAS CLI:

```bash
npm install --global eas-cli
eas login
```

Install dependencies:

```bash
npm install
```

The `postinstall` script patches a React Native Gradle plugin resolver issue needed for Android builds with this SDK/tooling combination.

## iOS Simulator Development Build

The `development` profile in `eas.json` already has `ios.simulator` set to `true`, which is required for iOS Simulator builds.

Create the iOS Simulator development build:

```bash
eas build --platform ios --profile development
```

When the build finishes, install it on an iOS Simulator from the EAS prompt, Expo dashboard, Expo Orbit, or by dragging the local simulator archive onto the simulator if you built locally.

Start the JavaScript bundler:

```bash
npm start
```

Then press `i` in the Expo CLI terminal to open the installed development build in the iOS Simulator.

## Run Targets

Start the Expo development server:

```bash
npm start
```

Run iOS locally from the native project:

```bash
npm run ios
```

Run Android locally from the native project:

```bash
npm run android
```

Start web:

```bash
npm run web
```

## Development Builds

Create an iOS Simulator development build with EAS:

```bash
eas build --platform ios --profile development
```

Create an iOS Simulator development build locally:

```bash
eas build --platform ios --profile development --local
```

Create an Android preview APK locally:

```bash
eas build --platform android --profile preview --local
```

## Quality Checks

Run lint:

```bash
npm run lint
```

Run unit tests:

```bash
npm test
```

## Cashback Program Data

The calculator reads its bet types, cashback rates, currency, program name, and monthly cap from:

```text
assets/json/cashbackProgram.json
```

Update that file to change the program content without touching the calculator UI.

## Important Files

- `src/app/index.tsx`: home route.
- `src/app/calc.tsx`: calculator route.
- `src/screens/HomeScreen.tsx`: home screen UI.
- `src/screens/BonusCalculatorScreen.tsx`: calculator flow UI.
- `src/hooks/useCalculator.ts`: calculator view model and flow state.
- `src/utils/calculatorUtils.ts`: pure calculation, formatting, parsing, and sanitizing helpers.
- `src/styles/theme.ts`: shared colors, radii, and font references.

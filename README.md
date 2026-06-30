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

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Then use the Expo CLI prompt to open the app in a development build, Android emulator, iOS simulator, or web browser.

## Run Targets

Start Android:

```bash
npm run android
```

Start iOS:

```bash
npm run ios
```

Start web:

```bash
npm run web
```

## Development Builds

Create an iOS development build with EAS:

```bash
eas build --platform ios --profile development
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

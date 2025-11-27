# Eyespie Development Plan

## Phase 1: Foundation
**Goal**: Establish the core architecture, navigation, and UI system.

- [ ] **Project Setup**: Verify Expo config, linting, and formatting.
- [ ] **Navigation**: Implement `expo-router` with stack navigation (Home, Camera, Game, Result).
- [ ] **UI Kit**: Create theme and base components (Button, Typography, Layout) using the design system.
- [ ] **State Management**: Set up `Zustand` stores for `GameStore` and `UserStore`.
- [ ] **Deep Linking**: Configure `expo-linking` to handle incoming game URLs.

## Phase 2: The Spy (Creation Flow)
**Goal**: Enable users to create and share puzzles.

- [ ] **Camera Feature**: Implement `expo-camera` with permission handling.
- [ ] **Image Manipulation**: Implement basic image cropping and resizing.
- [ ] **Obfuscation Logic**: Implement Blur and Pixelate filters (using `expo-gl` or `react-native-skia`).
- [ ] **Game Logic**: Create `GameInteractor` to manage the creation state (photo, clue, target).
- [ ] **Sharing**: Implement system share sheet integration to send deep links.

## Phase 3: The Detective (Gameplay Flow)
**Goal**: Enable users to join and solve puzzles.

- [ ] **Deep Link Handling**: Parse incoming URLs to extract game data/ID.
- [ ] **Game Screen**: Render the obfuscated image and clue.
- [ ] **Guessing Logic**: Implement text input and validation logic (exact/fuzzy match).
- [ ] **Reveal Animation**: Create a smooth transition from obfuscated to clear image upon success.
- [ ] **Game Over State**: Handle incorrect guesses and success state.

## Phase 4: Polish & Launch
**Goal**: Refine the experience and prepare for release.

- [ ] **Animations**: Add micro-interactions using `react-native-reanimated`.
- [ ] **Haptics**: Add haptic feedback for success/failure/camera actions.
- [ ] **Error Handling**: Implement graceful error boundaries and toast notifications.
- [ ] **App Icon & Splash**: Update assets with final branding.
- [ ] **Testing**: Run full E2E tests for both flows.

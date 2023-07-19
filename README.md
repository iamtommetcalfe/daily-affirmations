# Daily Affirmations

This is a simple React Native application built using Expo. The app displays a new affirmation each day and allows the user to add their own constants.

## Features

- Displays a new affirmation each day
- Allows user to add their own constants
- Sends a push notification at a specific time with a new affirmation
- Provides a "Refresh" button for instant affirmation change

## Prerequisites

- Node.js
- Yarn or npm
- Expo CLI

## Installation

To run this project locally, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/daily-constants.git
```

2. Navigate into the project directory:

```bash
cd daily-constants
```

3. Install the dependencies:

```bash
yarn install
# or with npm
npm install
```

4. Start the development server:

```bash
npx expo start
```

## Testing Notifications

To test push notifications, you will need to run the application on a physical device. Due to limitations in the iOS simulator, push notifications can't be tested in the simulator.

## Build the App

To build a standalone version of the app, use Expo's build service. Run the following command:

```bash
expo build:ios
# or for android
expo build:android
```

Follow the prompts to upload your Apple Developer credentials and other necessary information. Expo will build your assets and compile your app in the cloud, providing you with a download URL for your IPA (iOS) or APK (Android) file when done.

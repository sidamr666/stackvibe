# StackVibe Admin (Flutter)

iOS + macOS admin panel to review project requests coming from the marketing site.

## Platforms

- iOS (iPhone/iPad), Android and macOS.
- Bundle id / applicationId: `fyi.stackvibe.admin`.

## Build the Android APK

```bash
flutter build apk --release \
  --dart-define=FIREBASE_APP_ID=1:290455238328:android:XXXX \
  --dart-define=FIREBASE_API_KEY=AIza... \
  --dart-define=FIREBASE_PROJECT_ID=stackvibe-901ee
```

The APK lands in `build/app/outputs/flutter-apk/app-release.apk`.
Register an Android app in Firebase first to get the `android:` app id.

## Run

```bash
flutter pub get
flutter run            # on a connected simulator/device or macOS desktop
```

On Windows you can only run `flutter analyze` and `flutter test` - building iOS/macOS
requires a Mac with Xcode.

## Firebase configuration

Firebase is configured via `--dart-define` (see `lib/core/firebase_config.dart`), with
local defaults for the `stackvibe-901ee` project. For a real build, pass the
platform-specific app id:

```bash
flutter run \
  --dart-define=FIREBASE_APP_ID=1:290455238328:ios:XXXX \
  --dart-define=FIREBASE_API_KEY=AIza... \
  --dart-define=FIREBASE_PROJECT_ID=stackvibe-901ee
```

Recommended alternative: `dart pub global activate flutterfire_cli` then
`flutterfire configure --platforms=ios,macos` to generate `firebase_options.dart`.

## Access control

Firestore rules (repo root `firestore.rules`) let the admin read/update requests only
when a document exists at `admins/<auth-uid>`. After creating your Email/Password user,
create that document (any content) with the user's UID.

## Structure

```
lib/
  main.dart                     entry + Firebase init
  app.dart                      MaterialApp + auth gate
  core/                         theme, format, firebase config
  data/models/                  ProjectRequest
  data/repositories/            auth + requests (Firestore)
  ui/screens/                   login, requests list, request detail
  ui/widgets/                   status chip
test/                           model parsing tests
```

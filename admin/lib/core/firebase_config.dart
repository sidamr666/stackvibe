import 'package:firebase_core/firebase_core.dart';

/// Firebase configuration via --dart-define, with safe local defaults.
///
/// For a real iOS/macOS build, pass the platform-specific values, e.g.:
///   flutter run \
///     --dart-define=FIREBASE_APP_ID=1:290455238328:ios:XXXX \
///     --dart-define=FIREBASE_API_KEY=AIza... \
///     --dart-define=FIREBASE_PROJECT_ID=stackvibe-901ee
///
/// The recommended approach is `dart pub global activate flutterfire_cli`
/// then `flutterfire configure` to generate firebase_options.dart.
class FirebaseConfig {
  static const FirebaseOptions options = FirebaseOptions(
    apiKey: String.fromEnvironment(
      'FIREBASE_API_KEY',
      defaultValue: 'AIzaSyAjnEurbiPMZi3blM8K92oeXLF4OakCQ8c',
    ),
    appId: String.fromEnvironment(
      'FIREBASE_APP_ID',
      defaultValue: '1:290455238328:web:e2792e1a50a6ef7e74264d',
    ),
    messagingSenderId: String.fromEnvironment(
      'FIREBASE_MESSAGING_SENDER_ID',
      defaultValue: '290455238328',
    ),
    projectId: String.fromEnvironment(
      'FIREBASE_PROJECT_ID',
      defaultValue: 'stackvibe-901ee',
    ),
  );
}

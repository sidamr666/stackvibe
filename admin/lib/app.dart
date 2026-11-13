import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'core/theme.dart';
import 'data/repositories/auth_repository.dart';
import 'ui/screens/login_screen.dart';
import 'ui/screens/requests_screen.dart';

class StackVibeAdminApp extends StatelessWidget {
  const StackVibeAdminApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StackVibe Admin',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      home: StreamBuilder<User?>(
        stream: AuthRepository().authStateChanges(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Scaffold(body: Center(child: CircularProgressIndicator()));
          }
          return snapshot.hasData ? const RequestsScreen() : const LoginScreen();
        },
      ),
    );
  }
}

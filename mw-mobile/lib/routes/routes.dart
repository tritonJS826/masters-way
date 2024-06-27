import 'package:flutter/material.dart';
import 'package:mw_mobileapp/screens/welcome_screen.dart';
import 'package:mw_mobileapp/screens/all_ways_screen.dart';
import 'package:mw_mobileapp/screens/personal_area_screen.dart';
import 'package:mw_mobileapp/screens/all_users_screen.dart';
import 'package:mw_mobileapp/screens/home_screen.dart';
import 'package:mw_mobileapp/screens/settings_screen.dart';
import 'package:mw_mobileapp/screens/about_project_screen.dart';

class AppRoutes {
  static const String welcome = '/welcome';
  static const String allWays = '/all_ways';
  static const String personalArea = '/personal_area';
  static const String allUsers = '/all_users';
  static const String home = '/home';
  static const String settings = '/settings';
  static const String aboutProject = '/about_project';

  static Map<String, WidgetBuilder> define() {
    return {
      welcome: (context) => WelcomeScreen(),
      allWays: (context) => AllWaysScreen(),
      personalArea: (context) => PersonalAreaScreen(),
      allUsers: (context) => AllUsersScreen(),
      home: (context) => HomeScreen(),
      settings: (context) => SettingsScreen(),
      aboutProject: (context) => AboutProjectScreen(),
    };
  }
}

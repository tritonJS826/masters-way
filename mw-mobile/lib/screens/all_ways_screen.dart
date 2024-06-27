import 'package:flutter/material.dart';
import 'package:mw_mobileapp/routes/routes.dart';
import 'package:mw_mobileapp/widgets/custom_bottom_navigation_bar.dart';

class AllWaysScreen extends StatefulWidget {
  @override
  _AllWaysScreenState createState() => _AllWaysScreenState();
}

class _AllWaysScreenState extends State<AllWaysScreen> {
  int _selectedIndex = 1;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      switch (index) {
        case 0:
          Navigator.pushNamed(context, AppRoutes.home);
          break;
        case 1:
          Navigator.pushNamed(context, AppRoutes.allWays);
          break;
        case 2:
          Navigator.pushNamed(context, AppRoutes.personalArea);
          break;
        case 3:
          Navigator.pushNamed(context, AppRoutes.allUsers);
          break;
        case 4:
          Navigator.pushNamed(context, AppRoutes.settings);
          break;
        case 5:
          Navigator.pushNamed(context, AppRoutes.aboutProject);
          break;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('All Ways'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
          ),
        ],
      ),
      bottomNavigationBar: CustomBottomNavigationBar(
        selectedIndex: _selectedIndex,
        onItemTapped: _onItemTapped,
      ),
    );
  }
}

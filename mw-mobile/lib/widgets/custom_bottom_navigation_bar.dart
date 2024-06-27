import 'package:flutter/material.dart';

class CustomBottomNavigationBar extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemTapped;

  CustomBottomNavigationBar({
    required this.selectedIndex,
    required this.onItemTapped,
  });

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home, color: Colors.black),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.school, color: Colors.black),
          label: 'My Way',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person, color: Colors.black),
          label: 'Personal Area',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.group, color: Colors.black),
          label: 'All Users',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.settings, color: Colors.black),
          label: 'Settings',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.info, color: Colors.black),
          label: 'About Project',
        ),
      ],
      currentIndex: selectedIndex,
      selectedItemColor: Colors.black,
      unselectedItemColor: Colors.black,
      onTap: onItemTapped,
      backgroundColor: Colors.black,
    );
  }
}

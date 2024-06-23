import 'package:flutter/material.dart';

class AboutProjectScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About Project'),
      ),
      body: Center(
        child: Text('This is the About Project screen'),
      ),
    );
  }
}

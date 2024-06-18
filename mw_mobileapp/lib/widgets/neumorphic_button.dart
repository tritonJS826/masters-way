import 'package:flutter/material.dart';

Widget neumorphicButton(
    {required Widget child, required VoidCallback onPressed}) {
  return GestureDetector(
    onTap: onPressed,
    child: Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.indigo,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.indigo.shade700,
            offset: const Offset(6, 6),
            blurRadius: 12,
          ),
          const BoxShadow(
            color: Colors.white,
            offset: Offset(-6, -6),
            blurRadius: 12,
          ),
        ],
      ),
      child: child,
    ),
  );
}

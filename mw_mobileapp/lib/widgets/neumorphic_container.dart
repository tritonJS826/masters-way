import 'package:flutter/material.dart';

Widget neumorphicContainer(
    {required Widget child, EdgeInsetsGeometry? margin}) {
  return Container(
    margin: margin,
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Colors.grey[200],
      borderRadius: BorderRadius.circular(16),
      boxShadow: [
        BoxShadow(
          color: Colors.grey.shade400,
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
  );
}

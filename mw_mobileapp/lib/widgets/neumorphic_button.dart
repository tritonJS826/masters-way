import 'package:flutter/material.dart';
import '../styles/colors.dart';
import '../styles/shadows.dart';

class NeumorphicButton extends StatelessWidget {
  final Widget child;
  final VoidCallback onPressed;

  const NeumorphicButton({
    required this.child,
    required this.onPressed,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: const BoxDecoration(
          color: buttonColor,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: shadowDarkColor,
              offset: shadowOffset,
              blurRadius: shadowBlurRadius,
            ),
            BoxShadow(
              color: shadowLightColor,
              offset: shadowLightOffset,
              blurRadius: shadowBlurRadius,
            ),
          ],
        ),
        child: child,
      ),
    );
  }
}

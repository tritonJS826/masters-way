import 'package:flutter/material.dart';
import '../styles/colors.dart';
import '../styles/shadows.dart';

class NeumorphicContainer extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? margin;

  const NeumorphicContainer({
    required this.child,
    this.margin,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: containerColor,
        borderRadius: BorderRadius.circular(16),
        boxShadow: const [
          BoxShadow(
            color: iconColor,
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
    );
  }
}

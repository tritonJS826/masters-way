import 'package:flutter/material.dart';
import 'dart:math';
import '../routes/routes.dart';
import '../styles/colors.dart';
import '../styles/shadows.dart';

class WelcomeScreen extends StatefulWidget {
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  primaryColor,
                  secondaryColor,
                ],
              ),
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ShaderMask(
                shaderCallback: (rect) {
                  return LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [gradientStartColor, gradientEndColor],
                  ).createShader(rect);
                },
                child: Icon(Icons.flash_on, size: 100, color: textColor),
              ),
              SizedBox(height: 20),
              Text(
                'Accelerate your goals with an asynchronous learning app',
                style: TextStyle(fontSize: 24, color: textColor),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, AppRoutes.allWays);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: shadowLightColor,
                ),
                child: Text('Get Started'),
              ),
            ],
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: AnimatedBuilder(
              animation: _controller,
              builder: (context, child) {
                return CustomPaint(
                  painter: WavePainter(_controller.value),
                  child: Container(
                    height: 200,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class WavePainter extends CustomPainter {
  final double animationValue;

  WavePainter(this.animationValue);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = waveColor.withOpacity(0.7)
      ..style = PaintingStyle.fill;

    final path = Path();
    final waveHeight = 20;
    final waveLength = size.width;

    for (double i = 0; i <= waveLength; i++) {
      path.lineTo(
        i,
        waveHeight * sin((i / waveLength * 2 * pi) + (animationValue * 2 * pi)),
      );
    }

    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}

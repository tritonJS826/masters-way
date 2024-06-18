import 'package:flutter/material.dart';
import '../widgets/neumorphic_container.dart';
import '../widgets/neumorphic_button.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<String> _items = [];

  void _addItem() {
    setState(() {
      _items.add('Item ${_items.length + 1}');
    });
  }

  void _removeItem(int index) {
    setState(() {
      _items.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Text(widget.title),
      ),
      body: Stack(
        children: [
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Text(
                  'Your Items:',
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.black),
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: _items.length,
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: 8.0, horizontal: 16.0),
                        child: neumorphicContainer(
                          margin: const EdgeInsets.symmetric(
                              vertical: 4, horizontal: 16),
                          child: ListTile(
                            title: Text(
                              _items[index],
                              style: const TextStyle(color: Colors.black),
                            ),
                            trailing: IconButton(
                              icon: const Icon(Icons.delete,
                                  color: Colors.redAccent),
                              onPressed: () => _removeItem(index),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 80),
              ],
            ),
          ),
          Positioned(
            bottom: 30, // Подняли кнопку выше
            right: MediaQuery.of(context).size.width / 2 -
                28, // Центрировали кнопку
            child: neumorphicButton(
              onPressed: _addItem,
              child: const Icon(Icons.add, size: 40, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}

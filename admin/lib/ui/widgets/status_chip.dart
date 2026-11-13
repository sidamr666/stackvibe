import 'package:flutter/material.dart';

class StatusChip extends StatelessWidget {
  final String status;
  const StatusChip({super.key, required this.status});

  static const Map<String, Color> _colors = {
    'new': Color(0xFF4F46E5),
    'quoted': Color(0xFFD97706),
    'won': Color(0xFF059669),
    'lost': Color(0xFFE11D48),
  };
  static const Map<String, String> _labels = {
    'new': 'New',
    'quoted': 'Quoted',
    'won': 'Won',
    'lost': 'Lost',
  };

  @override
  Widget build(BuildContext context) {
    final color = _colors[status] ?? const Color(0xFF64748B);
    final label = _labels[status] ?? status;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Text(
        label,
        style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w600),
      ),
    );
  }
}

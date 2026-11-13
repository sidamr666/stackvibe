import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/format.dart';
import '../../core/theme.dart';
import '../../data/models/project_request.dart';
import '../../data/repositories/requests_repository.dart';
import '../widgets/status_chip.dart';

const List<String> _statuses = ['new', 'quoted', 'won', 'lost'];

class RequestDetailScreen extends StatefulWidget {
  final ProjectRequest request;
  const RequestDetailScreen({super.key, required this.request});

  @override
  State<RequestDetailScreen> createState() => _RequestDetailScreenState();
}

class _RequestDetailScreenState extends State<RequestDetailScreen> {
  final RequestsRepository _repo = RequestsRepository();
  late String _status;
  late final TextEditingController _price;
  late final TextEditingController _notes;
  bool _saving = false;

  @override
  void initState() {
    super.initState();
    _status = widget.request.status;
    _price = TextEditingController(text: widget.request.finalPrice?.toStringAsFixed(0) ?? '');
    _notes = TextEditingController(text: widget.request.notes);
  }

  @override
  void dispose() {
    _price.dispose();
    _notes.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    setState(() => _saving = true);
    try {
      await _repo.updateStatus(widget.request.id, _status);
      final price = double.tryParse(_price.text.trim());
      await _repo.updateDetails(widget.request.id, notes: _notes.text.trim(), finalPrice: price);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Saved')));
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _copy(String text) async {
    await Clipboard.setData(ClipboardData(text: text));
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Copied')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final r = widget.request;
    return Scaffold(
      appBar: AppBar(title: const Text('Request')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  r.name.isEmpty ? 'Anonymous' : r.name,
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: AppTheme.ink),
                ),
              ),
              StatusChip(status: _status),
            ],
          ),
          const SizedBox(height: 16),
          _InfoRow(label: 'Email', value: r.email, copyable: true, onCopy: () => _copy(r.email)),
          _InfoRow(label: 'Company', value: r.company),
          _InfoRow(label: 'Service', value: r.service),
          _InfoRow(label: 'Budget', value: r.budget),
          _InfoRow(
            label: 'Estimate',
            value: '${formatMoney(r.estimateMin, r.currency)} - ${formatMoney(r.estimateMax, r.currency)}',
          ),
          _InfoRow(label: 'Timeline', value: r.timeline),
          _InfoRow(label: 'Received', value: formatDate(r.createdAt)),
          if (r.platforms.isNotEmpty) _ChipsRow(label: 'Platforms', items: r.platforms),
          if (r.features.isNotEmpty) _ChipsRow(label: 'Features', items: r.features),
          if (r.message.isNotEmpty) ...[
            const SizedBox(height: 8),
            _SectionCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Project details', style: TextStyle(fontWeight: FontWeight.w600, color: AppTheme.ink)),
                  const SizedBox(height: 6),
                  Text(r.message, style: const TextStyle(color: Color(0xFF475069), height: 1.5)),
                ],
              ),
            ),
          ],
          const SizedBox(height: 8),
          _SectionCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Manage', style: TextStyle(fontWeight: FontWeight.w600, color: AppTheme.ink)),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: _status,
                  decoration: const InputDecoration(labelText: 'Status'),
                  items: [
                    for (final s in _statuses)
                      DropdownMenuItem(value: s, child: Text(s[0].toUpperCase() + s.substring(1))),
                  ],
                  onChanged: (v) => setState(() => _status = v ?? _status),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _price,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Final price (${'\u0024'} optional)'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _notes,
                  maxLines: 3,
                  decoration: const InputDecoration(labelText: 'Notes'),
                ),
                const SizedBox(height: 12),
                FilledButton(
                  onPressed: _saving ? null : _save,
                  child: _saving
                      ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Text('Save changes'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;
  final bool copyable;
  final VoidCallback? onCopy;
  const _InfoRow({required this.label, required this.value, this.copyable = false, this.onCopy});

  @override
  Widget build(BuildContext context) {
    final v = value.isEmpty ? '\u2014' : value;
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 92,
            child: Text(label, style: const TextStyle(fontSize: 13, color: Color(0xFF64748B))),
          ),
          Expanded(child: SelectableText(v, style: const TextStyle(fontSize: 14, color: AppTheme.ink))),
          if (copyable)
            IconButton(
              visualDensity: VisualDensity.compact,
              tooltip: 'Copy',
              icon: const Icon(Icons.copy, size: 18),
              onPressed: onCopy,
            ),
        ],
      ),
    );
  }
}

class _ChipsRow extends StatelessWidget {
  final String label;
  final List<String> items;
  const _ChipsRow({required this.label, required this.items});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 92,
            child: Text(label, style: const TextStyle(fontSize: 13, color: Color(0xFF64748B))),
          ),
          Expanded(
            child: Wrap(
              spacing: 6,
              runSpacing: 6,
              children: [
                for (final item in items)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(item, style: const TextStyle(fontSize: 12, color: Color(0xFF475069))),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  final Widget child;
  const _SectionCard({required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.line),
      ),
      child: child,
    );
  }
}


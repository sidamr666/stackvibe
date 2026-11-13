import 'package:flutter/material.dart';
import '../../core/format.dart';
import '../../core/theme.dart';
import '../../data/models/project_request.dart';
import '../../data/repositories/auth_repository.dart';
import '../../data/repositories/requests_repository.dart';
import '../widgets/status_chip.dart';
import 'request_detail_screen.dart';

const List<String> _filters = ['all', 'new', 'quoted', 'won', 'lost'];

class RequestsScreen extends StatefulWidget {
  const RequestsScreen({super.key});

  @override
  State<RequestsScreen> createState() => _RequestsScreenState();
}

class _RequestsScreenState extends State<RequestsScreen> {
  final RequestsRepository _repo = RequestsRepository();
  final AuthRepository _auth = AuthRepository();
  final TextEditingController _search = TextEditingController();
  String _filter = 'all';
  String _query = '';

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Requests'),
        actions: [
          IconButton(
            tooltip: 'Sign out',
            icon: const Icon(Icons.logout),
            onPressed: () => _auth.signOut(),
          ),
        ],
      ),
      body: Column(
        children: [
          _Kpis(repository: _repo),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
            child: TextField(
              controller: _search,
              onChanged: (v) => setState(() => _query = v.toLowerCase()),
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.search),
                hintText: 'Search by name, email or service...',
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Wrap(
              spacing: 8,
              children: [
                for (final f in _filters)
                  ChoiceChip(
                    label: Text(f == 'all' ? 'All' : f[0].toUpperCase() + f.substring(1)),
                    selected: _filter == f,
                    onSelected: (_) => setState(() => _filter = f),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 4),
          Expanded(
            child: StreamBuilder<List<ProjectRequest>>(
              stream: _repo.watchRequests(status: _filter),
              builder: (context, snapshot) {
                if (snapshot.hasError) {
                  return _EmptyState(text: 'Could not load requests.\n${snapshot.error}');
                }
                if (!snapshot.hasData) {
                  return const Center(child: CircularProgressIndicator());
                }
                var items = snapshot.data!;
                if (_query.isNotEmpty) {
                  items = items
                      .where((r) =>
                          r.name.toLowerCase().contains(_query) ||
                          r.email.toLowerCase().contains(_query) ||
                          r.service.toLowerCase().contains(_query))
                      .toList();
                }
                if (items.isEmpty) {
                  return const _EmptyState(text: 'No requests yet.');
                }
                return ListView.builder(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                  itemCount: items.length,
                  itemBuilder: (context, i) => _RequestTile(request: items[i]),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _Kpis extends StatelessWidget {
  final RequestsRepository repository;
  const _Kpis({required this.repository});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, int>>(
      future: repository.fetchCounts(),
      builder: (context, snapshot) {
        final counts = snapshot.data ?? const <String, int>{};
        return Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
          child: Row(
            children: [
              _Kpi(label: 'New', value: counts['new'] ?? 0, color: const Color(0xFF4F46E5)),
              const SizedBox(width: 10),
              _Kpi(label: 'Quoted', value: counts['quoted'] ?? 0, color: const Color(0xFFD97706)),
              const SizedBox(width: 10),
              _Kpi(label: 'Won', value: counts['won'] ?? 0, color: const Color(0xFF059669)),
              const SizedBox(width: 10),
              _Kpi(label: 'Total', value: counts['total'] ?? 0, color: AppTheme.ink),
            ],
          ),
        );
      },
    );
  }
}

class _Kpi extends StatelessWidget {
  final String label;
  final int value;
  final Color color;
  const _Kpi({required this.label, required this.value, required this.color});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppTheme.line),
        ),
        child: Column(
          children: [
            Text('$value', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: color)),
            const SizedBox(height: 2),
            Text(label, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
          ],
        ),
      ),
    );
  }
}

class _RequestTile extends StatelessWidget {
  final ProjectRequest request;
  const _RequestTile({required this.request});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.line),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: CircleAvatar(
          backgroundColor: AppTheme.indigo.withValues(alpha: 0.1),
          child: Text(
            request.name.isNotEmpty ? request.name[0].toUpperCase() : '?',
            style: const TextStyle(color: AppTheme.indigo, fontWeight: FontWeight.w700),
          ),
        ),
        title: Text(
          request.name.isEmpty ? 'Anonymous' : request.name,
          style: const TextStyle(fontWeight: FontWeight.w600, color: AppTheme.ink),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('${request.service} \u00b7 ${request.budget}'),
            Text(
              '${formatMoney(request.estimateMin, request.currency)} - ${formatMoney(request.estimateMax, request.currency)}',
              style: const TextStyle(fontSize: 12),
            ),
          ],
        ),
        trailing: StatusChip(status: request.status),
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => RequestDetailScreen(request: request)),
        ),
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  final String text;
  const _EmptyState({required this.text});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Text(
          text,
          textAlign: TextAlign.center,
          style: const TextStyle(color: Color(0xFF64748B)),
        ),
      ),
    );
  }
}


import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/project_request.dart';

class RequestsRepository {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  /// Requests ordered newest-first. Status filtering happens client-side to
  /// avoid requiring composite indexes.
  Stream<List<ProjectRequest>> watchRequests({String? status}) {
    return _db
        .collection('requests')
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snap) {
          final list = snap.docs
              .map((d) => ProjectRequest.fromFirestore(d.id, d.data()))
              .toList();
          if (status == null || status == 'all') return list;
          return list.where((r) => r.status == status).toList();
        });
  }

  Future<Map<String, int>> fetchCounts() async {
    final snap = await _db.collection('requests').get();
    final counts = <String, int>{'new': 0, 'quoted': 0, 'won': 0, 'total': snap.size};
    for (final doc in snap.docs) {
      final s = doc.data()['status']?.toString() ?? 'new';
      counts[s] = (counts[s] ?? 0) + 1;
    }
    return counts;
  }

  Future<void> updateStatus(String id, String status) => _db
      .collection('requests')
      .doc(id)
      .update({'status': status, 'updatedAt': FieldValue.serverTimestamp()});

  Future<void> updateDetails(String id, {String? notes, double? finalPrice}) =>
      _db.collection('requests').doc(id).update({
        'notes': ?notes,
        'finalPrice': ?finalPrice,
        'updatedAt': FieldValue.serverTimestamp(),
      });
}

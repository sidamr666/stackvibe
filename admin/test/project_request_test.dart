import 'package:admin/data/models/project_request.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('parses a Firestore document into a ProjectRequest', () {
    final request = ProjectRequest.fromFirestore('abc123', {
      'name': 'Jane',
      'email': 'jane@example.com',
      'service': 'iOS Apps',
      'status': 'new',
      'budget': '\$1,000 - \$5,000',
      'budgetMin': 1000,
      'estimateMin': 3000,
      'estimateMax': 5000,
      'platforms': ['iPhone'],
      'features': ['Accounts & auth'],
      'createdAt': Timestamp.fromMillisecondsSinceEpoch(0),
    });

    expect(request.id, 'abc123');
    expect(request.name, 'Jane');
    expect(request.email, 'jane@example.com');
    expect(request.service, 'iOS Apps');
    expect(request.status, 'new');
    expect(request.budgetMin, 1000.0);
    expect(request.estimateMin, 3000.0);
    expect(request.platforms, ['iPhone']);
    expect(request.features, ['Accounts & auth']);
    expect(request.createdAt, isNotNull);
  });

  test('handles missing optional fields gracefully', () {
    final request = ProjectRequest.fromFirestore('x', {
      'name': 'Anonymous',
      'email': 'a@b.co',
      'service': 'Web & SaaS',
    });

    expect(request.status, 'new');
    expect(request.platforms, isEmpty);
    expect(request.budgetMin, isNull);
    expect(request.finalPrice, isNull);
    expect(request.notes, '');
  });
}

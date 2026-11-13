import 'package:cloud_firestore/cloud_firestore.dart';

class ProjectRequest {
  final String id;
  final String name;
  final String email;
  final String company;
  final String service;
  final String budget;
  final double? budgetMin;
  final double? budgetMax;
  final String currency;
  final double? estimateMin;
  final double? estimateMax;
  final List<String> platforms;
  final List<String> features;
  final String timeline;
  final String message;
  final String status;
  final double? finalPrice;
  final String notes;
  final String source;
  final DateTime? createdAt;

  const ProjectRequest({
    required this.id,
    this.name = '',
    this.email = '',
    this.company = '',
    this.service = '',
    this.budget = '',
    this.budgetMin,
    this.budgetMax,
    this.currency = 'USD',
    this.estimateMin,
    this.estimateMax,
    this.platforms = const [],
    this.features = const [],
    this.timeline = '',
    this.message = '',
    this.status = 'new',
    this.finalPrice,
    this.notes = '',
    this.source = '',
    this.createdAt,
  });

  factory ProjectRequest.fromFirestore(String id, Map<String, dynamic> data) {
    return ProjectRequest(
      id: id,
      name: _str(data['name']),
      email: _str(data['email']),
      company: _str(data['company']),
      service: _str(data['service']),
      budget: _str(data['budget']),
      budgetMin: _double(data['budgetMin']),
      budgetMax: _double(data['budgetMax']),
      currency: data['currency']?.toString().isNotEmpty == true ? data['currency'].toString() : 'USD',
      estimateMin: _double(data['estimateMin']),
      estimateMax: _double(data['estimateMax']),
      platforms: _list(data['platforms']),
      features: _list(data['features']),
      timeline: _str(data['timeline']),
      message: _str(data['message']),
      status: _str(data['status']).isEmpty ? 'new' : _str(data['status']),
      finalPrice: _double(data['finalPrice']),
      notes: _str(data['notes']),
      source: _str(data['source']),
      createdAt: (data['createdAt'] as Timestamp?)?.toDate(),
    );
  }

  static String _str(dynamic v) => v?.toString() ?? '';
  static double? _double(dynamic v) => v is num ? v.toDouble() : null;
  static List<String> _list(dynamic v) =>
      v is List ? v.map((e) => e.toString()).toList() : const [];
}

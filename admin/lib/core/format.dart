import 'package:intl/intl.dart';

String formatMoney(num? value, [String currency = 'USD']) {
  if (value == null) return '\u2014';
  return NumberFormat.simpleCurrency(name: currency, decimalDigits: 0).format(value);
}

String formatDate(DateTime? date) {
  if (date == null) return '\u2014';
  return DateFormat('MMM d, yyyy \u00b7 HH:mm').format(date);
}

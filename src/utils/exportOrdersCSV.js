import { saveAs } from 'file-saver';

// Safely convert amount (number or string) to a clean numeric string
const formatAmount = (amount) => {
  if (amount === null || amount === undefined) return '0.00';
  if (typeof amount === 'number') return amount.toFixed(2);
  // It's a string — strip currency symbols
  const parsed = parseFloat(String(amount).replace(/[$,]/g, ''));
  return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
};

export const exportOrdersToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  const headers = ["Order ID", "Customer", "Date", "Amount", "Payment Method", "Status"];

  const rows = data.map(order => [
    order?.id ?? '',
    `"${(order?.customer ?? 'Unknown').replace(/"/g, '""')}"`,
    order?.date ?? '',
    formatAmount(order?.amount),
    order?.paymentMethod ?? '',
    order?.status ?? ''
  ].join(","));

  // Add UTF-8 BOM so Excel opens Arabic text correctly
  const BOM = '\uFEFF';
  const csvContent = BOM + [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

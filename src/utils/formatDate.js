export default function formatDate(dateToFormat) {
  return dateToFormat.slice(0, 10).split('-').reverse().join('-');
}

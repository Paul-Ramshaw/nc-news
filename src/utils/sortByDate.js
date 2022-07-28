export default function sortBytDate(arr) {
  const newArr = [...arr];
  return newArr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export default function generateLabel(title: string, numChars: number): string {
  if (!title) {
    return 'A';
  }
  const words = title.split(' ');
  let label = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    label += word.charAt(0).toUpperCase();
    if (label.length === numChars) {
      break;
    }
  }

  if (label.length < numChars) {
    label += title.charAt(title.length - 1).toUpperCase();
  }

  return label;
}

export const dateFormatter = (timestamp: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(Number(timestamp)));

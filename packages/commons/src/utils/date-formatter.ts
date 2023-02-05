const defaultOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
};

export const dateFormatter = (
  timestamp: string | number,
  options?: Intl.DateTimeFormatOptions
) =>
  new Intl.DateTimeFormat('en-US', options || defaultOptions).format(
    new Date(timestamp)
  );

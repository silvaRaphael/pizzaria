export const DateTime = (dt: Date | null = null): Date => {
  const date: Date = dt ? new Date(dt) : new Date();
  if (dt) return date;
  return new Date(
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000),
  );
};

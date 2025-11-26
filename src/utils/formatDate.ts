import dayjs from 'dayjs';

export function formatDateLongRu(date: Date | string | number): string {
  return dayjs(date).locale('ru').format('D MMMM YYYY [года]');
}

export function isRussianLongDateFormat(value: unknown): boolean {
  if (typeof value !== 'string') return false;

  const parsed = dayjs(value, 'D MMMM YYYY [года]', true);
  return parsed.isValid();
}

export function toISOStringFromRussianLong(value?: string): string | undefined {
  if (!value || typeof value !== 'string') return undefined;

  const s = value.trim();
  if (s === '') return undefined;

  const parsed = dayjs(s, 'D MMMM YYYY [года]', 'ru', true);
  if (!parsed.isValid()) return undefined;

  return parsed.format('YYYY-MM-DDTHH:mm:ss');
}

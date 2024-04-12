import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'yyyy-MM-dd';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'yyyy.M.d p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
    : '';
}

export function fISO(date: Date | null) {
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : undefined
}


export function formatSecondsToMinutesSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  let result = "";

  if (minutes > 0) {
    // 분이 있을 경우 분을 포함하여 포맷
    const formattedMinutes = minutes.toString().padStart(2, '0');
    result += `${formattedMinutes}분 `;
  }

  // 초는 항상 포맷하여 추가
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  result += `${formattedSeconds}초`;

  return result;
}

export function formatFlightTime(startTimeMs) {
  if (!startTimeMs) return "00:00:00";

  const durationMs = Date.now() - startTimeMs;

  let totalSeconds = Math.floor(durationMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const pad = (num) => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

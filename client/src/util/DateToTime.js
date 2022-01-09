export function DateToTime(tdate) {
  const created = new Date(tdate);
  const now = new Date();
  const diff = Math.floor((now - created) / 1000);
  if (diff <= 60) {
    return "지금";
  } else if (diff < 3600) {
    return Math.round(diff / 60) + "분 전";
  } else if (diff < 86400) {
    return Math.round(diff / 3600) + "시간 전";
  } else if (diff < 2592000) {
    return Math.round(diff / 86400) + "일 전";
  } else if (diff < 31104000) {
    return Math.round(diff / 2592000) + "달 전";
  } else {
    return Math.round(diff / 31104000) + "년 전";
  }
}

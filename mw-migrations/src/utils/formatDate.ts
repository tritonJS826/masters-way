export function formatDate(date: Date): string {
  const mskDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Europe/Moscow" })
  );

  return `${mskDate.getFullYear()}-${("0" + (mskDate.getMonth() + 1)).slice(
    -2
  )}-${("0" + mskDate.getDate()).slice(-2)}_${("0" + mskDate.getHours()).slice(
    -2
  )}-${("0" + mskDate.getMinutes()).slice(-2)}-${(
    "0" + mskDate.getSeconds()
  ).slice(-2)}`;
}

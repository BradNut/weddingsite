export async function copyToClipboard(textToCopy) {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (e) {
    console.error(e);
  }
}

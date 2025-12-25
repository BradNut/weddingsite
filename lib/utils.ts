export async function copyToClipboard(textToCopy: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (e) {
    console.error(e);
  }
}

async function handleUmamiEvent(eventValue, eventType) {
  if (typeof window !== 'undefined') {
    window?.umami?.trackEvent(eventValue, eventType);
  }
}

export { handleUmamiEvent };

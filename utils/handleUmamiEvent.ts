declare global {
  interface Window {
    umami?: {
      trackEvent: (eventValue: string, eventType: string) => void;
    };
  }
}

async function handleUmamiEvent(eventValue: string, eventType: string): Promise<void> {
  if (typeof window !== 'undefined') {
    window?.umami?.trackEvent(eventValue, eventType);
  }
}

export { handleUmamiEvent };

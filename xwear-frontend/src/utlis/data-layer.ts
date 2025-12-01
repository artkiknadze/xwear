declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const pushDataLayer = (eventData: any) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }
};

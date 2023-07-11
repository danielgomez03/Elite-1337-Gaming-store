import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-0X8N5JSLGG");
    }
  }, []);

  return null;
};

export default GoogleAnalytics;

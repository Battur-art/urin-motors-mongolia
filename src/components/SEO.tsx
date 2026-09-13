import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_TITLE = "Urin Motors | Чанартай Япон машин худалдаа - Улаанбаатар";
const DEFAULT_DESCRIPTION =
  "Urin Motors - Японоос шууд татан авсан чанартай Toyota, Lexus хайбрид болон бензин автомашинууд. Улаанбаатар хот, Авто 22 худалдаа. Утас: 8022 2270, 9900 0235.";
const DEFAULT_IMAGE = "https://www.urin-motors.mn/og-image.jpg";
const BASE_URL = "https://www.urin-motors.mn";

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Urin Motors` : DEFAULT_TITLE;
    document.title = fullTitle;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const currentUrl = url ? (url.startsWith("http") ? url : `${BASE_URL}${url}`) : window.location.href;

    setMetaTag("description", description);
    setMetaTag("og:title", fullTitle, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:image", image, true);
    setMetaTag("og:url", currentUrl, true);
    setMetaTag("og:type", type, true);
    setMetaTag("twitter:title", fullTitle);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);
  }, [title, description, image, url, type]);

  return null;
}

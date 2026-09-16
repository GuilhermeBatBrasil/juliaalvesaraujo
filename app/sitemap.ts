import type { MetadataRoute } from "next";

import { navLinks, siteConfig } from "@/lib/site-config";
import { normalizeUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = normalizeUrl(siteConfig.url);

  return navLinks.map((link) => ({
    url: `${baseUrl}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
  }));
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { normalizeUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: normalizeUrl(siteConfig.url),
      lastModified: new Date(),
      priority: 1,
    },
  ];
}

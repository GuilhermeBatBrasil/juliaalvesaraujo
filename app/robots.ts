import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { normalizeUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = normalizeUrl(siteConfig.url);

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

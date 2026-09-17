import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { normalizeUrl } from "@/lib/utils";

// Exigido pelo `output: "export"`: gera sitemap.xml no build, sem servidor.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: normalizeUrl(siteConfig.url),
      lastModified: new Date(),
      priority: 1,
    },
  ];
}

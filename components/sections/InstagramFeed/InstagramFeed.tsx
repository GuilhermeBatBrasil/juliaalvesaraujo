import Image from "next/image";

import { Container } from "@/components/layout/Container/Container";
import { getInstagramPosts } from "@/lib/instagram";
import { siteConfig } from "@/lib/site-config";
import type { InstagramPost } from "@/types/instagram";

import styles from "./InstagramFeed.module.css";

/** Usa a legenda como texto alternativo, limitada a uma frase curta. */
function buildAltText(post: InstagramPost): string {
  if (!post.caption) return "Publicação do Instagram de Júlia Araújo";

  const firstLine = post.caption.split("\n")[0].trim();
  return firstLine.length > 120 ? `${firstLine.slice(0, 117)}...` : firstLine;
}

export async function InstagramFeed() {
  const posts = await getInstagramPosts();
  const { instagram } = siteConfig.social;

  return (
    <section
      id="meu-instagram"
      className={styles.instagram}
      aria-labelledby="instagram-title"
    >
      <Container medium>
        <h2 id="instagram-title" className={styles.title}>
          Meu Instagram
        </h2>

        <ul className={styles.grid}>
          {posts.map((post) => {
            const alt = buildAltText(post);

            const image = (
              <Image
                src={post.imageUrl}
                alt={alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className={styles.image}
                // Imagens da CDN do Instagram já vêm otimizadas.
                unoptimized={post.imageUrl.startsWith("http")}
              />
            );

            return (
              <li key={post.id} className={styles.item}>
                {post.permalink ? (
                  <a
                    href={post.permalink}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {image}
                    <span className="visually-hidden">
                      Ver publicação no Instagram
                    </span>
                  </a>
                ) : (
                  image
                )}
              </li>
            );
          })}
        </ul>

        {instagram && (
          <p className={styles.cta}>
            <a
              href={instagram}
              className={styles.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver perfil no Instagram
            </a>
          </p>
        )}
      </Container>
    </section>
  );
}

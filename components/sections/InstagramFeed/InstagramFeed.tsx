import Image from "next/image";

import { Container } from "@/components/layout/Container/Container";

import styles from "./InstagramFeed.module.css";

/**
 * Grade de 8 imagens. Os arquivos em /public/images/julia/instagram-N.jpg
 * podem ser substituídos sem alterar o layout.
 * TODO: substituir pelos textos alternativos reais de cada publicação.
 */
const posts = Array.from({ length: 8 }, (_, index) => ({
  src: `/images/julia/instagram-${index + 1}.jpg`,
  alt: `Publicação ${index + 1} do Instagram de Júlia Araújo`,
}));

export function InstagramFeed() {
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
          {posts.map((post) => (
            <li key={post.src} className={styles.item}>
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

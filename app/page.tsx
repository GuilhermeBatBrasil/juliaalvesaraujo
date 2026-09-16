import { About } from "@/components/sections/About/About";
import { Contact } from "@/components/sections/Contact/Contact";
import { Hero } from "@/components/sections/Hero/Hero";
import { InstagramFeed } from "@/components/sections/InstagramFeed/InstagramFeed";
import { Journey } from "@/components/sections/Journey/Journey";
import { Sessions } from "@/components/sections/Sessions/Sessions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Sessions />
      <Contact />
      <InstagramFeed />
    </>
  );
}

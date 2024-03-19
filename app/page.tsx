import Hero from "@/components/Hero";
import Hightlights from "@/components/Hightlights";

export default function Home() {
  return (
    <div>
      <Hero />
      <Hightlights />
      <img
        src="/assets/images/hero.jpeg"
        alt="hero-image"
        className="h-[500px] w-full object-cover"
      />
    </div>
  );
}

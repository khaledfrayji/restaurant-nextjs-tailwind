import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import PopularNow from "@/components/PopularNow";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <PopularNow />
    </>
  );
}

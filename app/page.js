// app/page.js
import { personalData } from "../../utils/data/personal-data";
import AboutSection from "../../components/homepage/about";
import Blog from "../../components/homepage/blog";
import ContactSection from "../../components/homepage/contact";
import Education from "../../components/homepage/education";
import Experience from "../../components/homepage/experience";
import HeroSection from "../../components/homepage/hero-section";
import Projects from "../../components/homepage/projects";
import Skills from "../../components/homepage/skills";

export const dynamic = "force-dynamic"; // Optional

async function getData() {
  try {
    if (!personalData?.devUsername) {
      throw new Error("Developer username not provided.");
    }

    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const data = await res.json();

    return data
      .filter((item) => item?.cover_image)
      .sort(() => Math.random() - 0.5); // shuffle blogs
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
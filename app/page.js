
import { personalData } from "../../utils/data/personal-data";
import AboutSection from "../../components/homepage/about/index";
import Blog from "../../components/homepage/blog/index";
import ContactSection from "../../components/homepage/contact/index";
import Education from "../../components/homepage/education/index";
import Experience from "../../components/homepage/experience/index";
import HeroSection from "../../components/homepage/hero-section/index";
import Projects from "../../components/homepage/projects/index";
import Skills from "../../components/homepage/skills/index";

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
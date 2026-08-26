import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import {
  getProjects,
  getTestimonials,
  getExpertise,
  getSettings,
  getSections,
  getResources,
} from "@/lib/queries";

// Re-fetch from the DB at most once a minute; admin mutations also
// revalidate this path for near-instant updates.
export const revalidate = 600;

export default async function Home() {
  const [settings, projects, testimonials, expertise, sections, resources] =
    await Promise.all([
      getSettings(),
      getProjects(),
      getTestimonials(),
      getExpertise(),
      getSections(),
      getResources(),
    ]);

  return (
    <>
      <ScrollProgress />
      <Navbar settings={settings} />
      <main>
        <Hero settings={settings} />
        <Expertise groups={expertise} heading={sections.expertise} />
        <Projects items={projects} heading={sections.work} />
        <Testimonials items={testimonials} heading={sections.testimonials} />
        <Resources items={resources} heading={sections.resources} />
        <Contact settings={settings} heading={sections.contact} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

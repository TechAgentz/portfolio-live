import Navbar from "@/components/Navbar";
import Hero25 from "@/components/originkit/hero-25";
import About from "@/components/About";
import Team from "@/components/Team";
import Expertise from "@/components/Expertise";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import {
  getMembers,
  getProjects,
  getPosts,
  getTestimonials,
  getExpertise,
  getProcess,
  getSettings,
  getValues,
  getSections,
} from "@/lib/queries";

// Re-fetch from the DB at most once a minute; admin mutations also
// revalidate this path for near-instant updates.
export const revalidate = 600;

export default async function Home() {
  const [
    settings,
    members,
    projects,
    posts,
    testimonials,
    expertise,
    process,
    valueCards,
    sections,
  ] = await Promise.all([
    getSettings(),
    getMembers(),
    getProjects(),
    getPosts(),
    getTestimonials(),
    getExpertise(),
    getProcess(),
    getValues(),
    getSections(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Navbar settings={settings} />
      <main>
        <Hero25 />
        <div className="section-line mx-auto max-w-7xl" />
        <About settings={settings} valueCards={valueCards} heading={sections.about} />
        <Team members={members} heading={sections.team} />
        <Expertise groups={expertise} heading={sections.expertise} />
        <Projects items={projects} heading={sections.work} />
        <Process steps={process} heading={sections.process} />
        <Testimonials items={testimonials} heading={sections.testimonials} />
        <Blog items={posts} heading={sections.blog} />
        <Contact settings={settings} heading={sections.contact} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

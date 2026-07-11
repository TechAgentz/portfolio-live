import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
} from "@/lib/queries";

// Re-fetch from the DB at most once a minute; admin mutations also
// revalidate this path for near-instant updates.
export const revalidate = 60;

export default async function Home() {
  const [
    settings,
    members,
    projects,
    posts,
    testimonials,
    expertise,
    process,
  ] = await Promise.all([
    getSettings(),
    getMembers(),
    getProjects(),
    getPosts(),
    getTestimonials(),
    getExpertise(),
    getProcess(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Navbar settings={settings} />
      <main>
        <Hero settings={settings} />
        <div className="section-line mx-auto max-w-7xl" />
        <About settings={settings} />
        <Team members={members} />
        <Expertise groups={expertise} />
        <Projects items={projects} />
        <Process steps={process} />
        <Testimonials items={testimonials} />
        <Blog items={posts} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}

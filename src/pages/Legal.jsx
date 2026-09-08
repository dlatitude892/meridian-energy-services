import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    body: `Meridian Energy Services ("Meridian", "we", "us") respects your privacy. This placeholder policy outlines the categories of information we collect through this website — including contact form submissions, job applications, and general browsing analytics — and how that information is used to respond to inquiries, evaluate applications, and improve our services. Replace this text from the Admin Dashboard with your organization's finalized privacy policy before launch.`,
  },
  terms: {
    title: "Terms & Conditions",
    body: `These placeholder Terms & Conditions govern use of the Meridian Energy Services website. By accessing this site you agree not to misuse its content, submission forms, or systems. Replace this text from the Admin Dashboard with your organization's finalized terms before launch.`,
  },
  cookies: {
    title: "Cookie Policy",
    body: `This placeholder Cookie Policy explains that Meridian Energy Services may use essential cookies to operate this website and, where enabled, analytics cookies to understand site usage. Replace this text from the Admin Dashboard with your organization's finalized cookie policy before launch.`,
  },
};

export default function Legal({ type }) {
  const c = CONTENT[type] || CONTENT.privacy;
  return (
    <div>
      <PageHero kicker="LEGAL" title={c.title} crumbs={[{ label: c.title }]} />
      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <Reveal>
          <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{c.body}</p>
        </Reveal>
      </section>
    </div>
  );
}

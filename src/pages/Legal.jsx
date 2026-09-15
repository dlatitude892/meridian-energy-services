import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const EFFECTIVE_DATE = "September 15, 2026";

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    intro: `This Privacy Policy explains how Meridian Energy Services ("Meridian", "we", "us", or "our") collects, uses, discloses, and safeguards information when you visit meridianenergyservices.com (the "Site"), submit an inquiry, apply for a position, or otherwise interact with us. By using the Site, you agree to the practices described in this policy.`,
    sections: [
      {
        heading: "1. Information We Collect",
        body: `We collect information in the following ways:

Information you provide directly: your name, email address, phone number, company name, job title, and any message content when you submit a contact form, request a proposal, or apply for a position, including resumes, cover letters, and related career documents.

Information collected automatically: when you browse the Site, we and our service providers may automatically collect certain technical information, including your IP address, browser type and version, device type, pages viewed, referring URLs, and timestamps, generally through cookies and similar technologies (see our Cookie Policy for details).

Information from other sources: we may receive information about you from third parties, such as recruitment platforms, business partners, or publicly available sources, where permitted by applicable law.`,
      },
      {
        heading: "2. How We Use Your Information",
        body: `We use the information we collect to:

• Respond to inquiries and provide requested information about our services;
• Evaluate and process job applications;
• Operate, maintain, and improve the Site;
• Communicate with you about our services, projects, and opportunities;
• Comply with legal obligations and enforce our agreements and policies;
• Detect, prevent, and address fraud, security, or technical issues.

We do not sell your personal information to third parties.`,
      },
      {
        heading: "3. How We Share Information",
        body: `We may share information with:

• Service providers who perform functions on our behalf, such as hosting, analytics, and communications, and who are bound by confidentiality obligations;
• Affiliated Meridian offices and regional teams for the purpose of responding to inquiries or evaluating applications relevant to their region;
• Professional advisors, regulators, or authorities where required by law, legal process, or to protect our rights, property, or safety, or that of others;
• A successor entity in connection with a merger, acquisition, financing, or sale of assets.`,
      },
      {
        heading: "4. Data Retention",
        body: `We retain personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law. Job application materials are generally retained for a limited period following the close of the relevant recruitment process, after which they are securely deleted or anonymized, unless you consent to a longer retention period for consideration in future opportunities.`,
      },
      {
        heading: "5. Data Security",
        body: `We implement reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.`,
      },
      {
        heading: "6. International Data Transfers",
        body: `As an international contractor with offices across multiple regions, information you provide may be transferred to, stored, and processed in countries other than your own, including the United States. Where required by applicable law, we take steps to ensure such transfers are subject to appropriate safeguards.`,
      },
      {
        heading: "7. Your Rights",
        body: `Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the use of your personal information, or to object to certain processing. To exercise these rights, contact us using the details below. We will respond in accordance with applicable law.`,
      },
      {
        heading: "8. Children's Privacy",
        body: `The Site is not directed to individuals under the age of 18, and we do not knowingly collect personal information from children.`,
      },
      {
        heading: "9. Changes to This Policy",
        body: `We may update this Privacy Policy from time to time. Material changes will be reflected by updating the effective date below. Continued use of the Site after changes take effect constitutes acceptance of the revised policy.`,
      },
      {
        heading: "10. Contact Us",
        body: `Questions about this Privacy Policy or our data practices can be directed to us via the contact form on this Site.`,
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: `These Terms & Conditions ("Terms") govern your access to and use of meridianenergyservices.com (the "Site"), operated by Meridian Energy Services ("Meridian", "we", "us", or "our"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.`,
    sections: [
      {
        heading: "1. Use of the Site",
        body: `You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to:

• Use the Site in any way that violates applicable local, national, or international law or regulation;
• Attempt to gain unauthorized access to the Site, its servers, or any connected systems;
• Interfere with or disrupt the operation of the Site or the servers or networks used to make it available;
• Submit false, misleading, or fraudulent information through any contact, inquiry, or application form;
• Use any automated system, including bots or scrapers, to access the Site for any purpose without our express written permission.`,
      },
      {
        heading: "2. Intellectual Property",
        body: `All content on the Site — including text, graphics, logos, images, project case studies, and the underlying software and design — is the property of Meridian Energy Services or its licensors and is protected by applicable intellectual property laws. You may view and print content from the Site for personal, non-commercial reference only. No other use, including reproduction, distribution, modification, or creation of derivative works, is permitted without our prior written consent.`,
      },
      {
        heading: "3. No Professional or Engineering Advice",
        body: `Content on the Site, including service descriptions, project summaries, and safety and sustainability information, is provided for general informational purposes only and does not constitute engineering, technical, legal, financial, or professional advice specific to your circumstances. Any engagement of Meridian's services is subject to a separate, signed services agreement or contract, the terms of which will govern over any description found on this Site.`,
      },
      {
        heading: "4. Submissions and Job Applications",
        body: `Any information, proposals, resumes, or other materials you submit through the Site are provided voluntarily and are handled in accordance with our Privacy Policy. Submitting a job application, inquiry, or proposal request does not guarantee a response, interview, employment offer, or contract award. We reserve the right to accept or decline any inquiry or application at our sole discretion.`,
      },
      {
        heading: "5. Third-Party Links",
        body: `The Site may contain links to third-party websites that are not owned or controlled by Meridian. We are not responsible for the content, privacy policies, or practices of any third-party websites and encourage you to review their terms independently.`,
      },
      {
        heading: "6. Disclaimer of Warranties",
        body: `The Site and its content are provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or accuracy of content. We do not warrant that the Site will be uninterrupted, error-free, or secure.`,
      },
      {
        heading: "7. Limitation of Liability",
        body: `To the fullest extent permitted by applicable law, Meridian Energy Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunity, arising out of or in connection with your use of, or inability to use, the Site, even if advised of the possibility of such damages.`,
      },
      {
        heading: "8. Indemnification",
        body: `You agree to indemnify and hold harmless Meridian Energy Services, its affiliates, officers, employees, and agents from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising out of your use of the Site or your violation of these Terms.`,
      },
      {
        heading: "9. Governing Law",
        body: `These Terms are governed by and construed in accordance with the laws applicable at Meridian's principal place of business, without regard to conflict of law principles, unless otherwise required by mandatory local law applicable to you.`,
      },
      {
        heading: "10. Changes to These Terms",
        body: `We may revise these Terms at any time by updating this page. Continued use of the Site following any changes constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.`,
      },
      {
        heading: "11. Contact Us",
        body: `Questions about these Terms can be directed to us via the contact form on this Site.`,
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: `This Cookie Policy explains how Meridian Energy Services ("Meridian", "we", "us", or "our") uses cookies and similar tracking technologies on meridianenergyservices.com (the "Site"), and the choices available to you.`,
    sections: [
      {
        heading: "1. What Are Cookies",
        body: `Cookies are small text files placed on your device when you visit a website. They are widely used to make websites function, to remember your preferences, and to provide information to the site owner about how the site is used.`,
      },
      {
        heading: "2. Types of Cookies We Use",
        body: `Essential cookies: required for the Site to function properly, such as enabling navigation and secure access to portal areas. These cannot be disabled without affecting Site functionality.

Performance and analytics cookies: help us understand how visitors interact with the Site, such as which pages are viewed most often, so we can improve content and usability. These are used only where enabled and, where required by law, only with your consent.

Preference cookies: remember choices you have made, such as display settings, to provide a more personalized experience on return visits.

We do not use cookies to serve third-party advertising.`,
      },
      {
        heading: "3. Managing Cookies",
        body: `Most web browsers allow you to control cookies through their settings, including blocking or deleting cookies already stored on your device. Please note that disabling essential cookies may affect the functionality of the Site. You can typically find these controls in the "Settings," "Privacy," or "Security" section of your browser.`,
      },
      {
        heading: "4. Changes to This Policy",
        body: `We may update this Cookie Policy from time to time to reflect changes in the cookies and technologies we use. Material changes will be reflected by updating the effective date below.`,
      },
      {
        heading: "5. Contact Us",
        body: `Questions about this Cookie Policy can be directed to us via the contact form on this Site.`,
      },
    ],
  },
};

export default function Legal({ type }) {
  const c = CONTENT[type] || CONTENT.privacy;
  return (
    <div>
      <PageHero kicker="LEGAL" title={c.title} crumbs={[{ label: c.title }]} />
      <section className="max-w-3xl mx-auto px-5 py-16 sm:py-20">
        <Reveal>
          <div className="text-xs font-mono text-slate-500 mb-8">Effective date: {EFFECTIVE_DATE}</div>
        </Reveal>
        <Reveal>
          <p className="text-slate-400 text-sm leading-relaxed mb-10">{c.intro}</p>
        </Reveal>
        <div className="space-y-8">
          {c.sections.map((s, i) => (
            <Reveal key={i} delay={i * 30}>
              <div>
                <h2 className="font-display text-white text-base mb-2.5">{s.heading}</h2>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

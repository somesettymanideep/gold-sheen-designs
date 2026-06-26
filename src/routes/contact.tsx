import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { SITE } from "@/lib/site";
import bannerContact from "@/assets/banner-contact.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Durga Hardware and Plywood, Vijayawada" },
      {
        name: "description",
        content:
          "Visit our showroom on M.G. Road, Governor Peta, Vijayawada. Call 7842591100 or send us a message — we usually reply within an hour.",
      },
      { property: "og:title", content: "Contact Durga Hardware and Plywood" },
      { property: "og:description", content: "Showroom, phone, email and live map." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const info = [
    {
      icon: MapPin,
      title: "Our Address",
      lines: [SITE.address.line1, SITE.address.line2, SITE.address.city],
      href: SITE.mapsHref,
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      lines: [SITE.phone],
      href: SITE.phoneHref,
    },
    {
      icon: Mail,
      title: "Email Addresses",
      lines: [SITE.email],
      href: `mailto:${SITE.email}`,
    },
  ];

  return (
    <PageLayout>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd love to hear from you"
        subtitle="Visit our showroom, give us a call, or drop a message — we usually reply within the hour."
        crumb="Contact"
        bgImage={bannerContact}
      />

      {/* Info Cards */}
      <section className="section-pad bg-[#F4F0EA] -mt-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {info.map(({ icon: Icon, title, lines, href }) => (
            <a
              key={title}
              href={href}
              target={title === "Our Address" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-start gap-5 rounded-2xl bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-gold"
            >
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gold text-white shadow-gold">
                <Icon className="h-7 w-7" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="font-display text-xl font-bold text-charcoal">
                  {title}
                </h3>
                <div className="mt-3 text-[15px] leading-relaxed text-muted-foreground break-words">
                  {lines.map((l, i) => (
                    <div key={i} className="break-words">{l}</div>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Hours */}
      <section className="section-pad bg-[#F4F0EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              addSubmission({
                type: "contact",
                name: String(data.get("name") ?? "").trim(),
                phone: String(data.get("mobile") ?? "").trim(),
                email: String(data.get("email") ?? "").trim() || undefined,
                subject: String(data.get("subject") ?? "").trim() || undefined,
                message: String(data.get("message") ?? "").trim() || undefined,
              });
              form.reset();
              alert("Thank you! We'll reach out shortly.");
            }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 sm:p-10 shadow-soft"
          >
            <span className="eyebrow">Send a Message</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-charcoal">
              Tell us about your <span className="text-gradient-gold">project</span>
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder="Your Name"
                className="w-full rounded-xl border border-border bg-beige/40 px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none"
              />
              <input
                name="mobile"
                type="tel"
                required
                placeholder="Mobile Number"
                className="w-full rounded-xl border border-border bg-beige/40 px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-beige/40 px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none sm:col-span-1"
              />
              <input
                name="subject"
                placeholder="Subject"
                className="w-full rounded-xl border border-border bg-beige/40 px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none sm:col-span-1"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Message"
                className="sm:col-span-2 w-full rounded-xl border border-border bg-beige/40 px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none resize-none"
              />
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl gradient-gold px-6 py-4 text-sm font-semibold text-white shadow-gold hover:scale-[1.01] transition"
              >
                Send Message <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-charcoal text-white rounded-3xl p-8 shadow-elevated">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl gradient-gold">
                  <Clock className="h-5 w-5 text-white" />
                </span>
                <h3 className="font-display text-2xl font-bold">Business Hours</h3>
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between py-3 text-sm">
                    <span className="text-white/70">{h.day}</span>
                    <span className="font-semibold text-gold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <h3 className="font-display text-xl font-bold text-charcoal">Prefer to talk?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Reach us directly — we're happy to help with samples, pricing or project advice.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl gradient-gold px-5 py-3 text-sm font-semibold text-white shadow-gold"
                >
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="bg-[#F4F0EA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="overflow-hidden rounded-3xl shadow-elevated border border-border">
            <iframe
              src={SITE.mapsEmbed}
              title="Showroom location"
              className="w-full h-[450px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Phone,
  MessageCircle,
  Mail,
  Globe,
  UserPlus,
  Share2,
  MapPin,
  Activity,
  Download,
  Check,
} from "lucide-react";
import {
  presencePoints,
  productCategories,
  profile,
  services,
  stats,
  vCard,
  whyPoints,
} from "@/data/profile";

const TITLE = "Biraj Gajera | Founder | Enreach Global Inc.";
const DESCRIPTION =
  "Biraj Gajera, Founder at Enreach Global Inc. — connecting reliable metal scrap supply with global industrial demand.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          telephone: profile.phoneDisplay,
          email: `mailto:${profile.email}`,
          url: profile.website,
          worksFor: { "@type": "Organization", name: profile.company, url: profile.website },
          address: { "@type": "PostalAddress", addressCountry: "CA" },
        }),
      },
    ],
  }),
  component: CardPage,
});

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold leading-snug text-foreground sm:text-3xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-20 bg-accent/60" />
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function ActionTile({
  href,
  icon,
  label,
  onClick,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
        {icon}
      </span>
      <span className="mt-3 text-sm font-medium text-foreground">{label}</span>
    </>
  );
  const cls =
    "card-surface flex w-full flex-col items-center justify-center px-4 py-6 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0";
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

function CardPage() {
  const [activeCategory, setActiveCategory] = useState(productCategories[0]!.id);
  const [shared, setShared] = useState(false);
  const [cardUrl, setCardUrl] = useState(profile.website);
  const qrWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCardUrl(window.location.origin + window.location.pathname);
  }, []);

  const saveContact = () => {
    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Biraj-Gajera-Enreach-Global.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareCard = async () => {
    const data = { title: TITLE, text: DESCRIPTION, url: cardUrl };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* dismissed */
      }
    }
    await navigator.clipboard?.writeText(cardUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const downloadQr = () => {
    const canvas = qrWrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "Biraj-Gajera-VynkCard-QR.png";
    a.click();
  };

  const products = productCategories.find((c) => c.id === activeCategory) ?? productCategories[0]!;

  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });

    const pause = () => {
      pausedUntil.current = Date.now() + 4000;
    };
    el.addEventListener("pointerdown", pause);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });

    const tick = () => {
      if (Date.now() < pausedUntil.current) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 12;
      const originalWidth = el.scrollWidth / 2;
      const next = el.scrollLeft + step;

      if (next >= originalWidth - 4) {
        const wrapped = next - originalWidth;
        el.scrollTo({ left: wrapped, behavior: "auto" });
      } else {
        el.scrollTo({ left: next, behavior: "smooth" });
      }
    };

    const id = window.setInterval(tick, 1800);

    return () => {
      window.clearInterval(id);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
    };
  }, [activeCategory]);

  return (
    <main className="mx-auto w-full max-w-[30rem] px-4 pb-16 pt-6 sm:px-6">
      {/* Hero / profile */}
      <section className="card-surface fade-up overflow-hidden">
        <div className="relative h-32 sm:h-36">
          <img
            src={profile.heroImage}
            alt="Aluminium Zorba scrap prepared for export"
            className="size-full object-cover"
          />
          <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground shadow-sm">
            Verified Premium
          </span>
        </div>
        <div className="px-6 pb-8 pt-6 text-center">
          <img
            src={profile.logo}
            alt="Enreach Global Inc. logo"
            className="mx-auto h-14 w-auto object-contain"
          />
          <h1 className="mt-4 text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
            {profile.company}
          </h1>
          <p className="eyebrow mt-1">{profile.industry}</p>
          <img
            src={profile.portrait}
            alt="Biraj Gajera, Founder of Enreach Global Inc."
            className="mx-auto mt-6 size-28 rounded-full border-2 border-accent/70 object-cover p-1"
          />
          <p className="mt-4 text-lg font-bold text-foreground">{profile.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {profile.title}
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        <ActionTile href={`tel:${profile.phoneRaw}`} icon={<Phone size={18} />} label="Call Now" />
        <ActionTile
          href={`https://wa.me/${profile.whatsapp}`}
          icon={<MessageCircle size={18} />}
          label="WhatsApp"
        />
        <ActionTile href={`mailto:${profile.email}`} icon={<Mail size={18} />} label="Email" />
        <ActionTile href={profile.website} icon={<Globe size={18} />} label="Website" />
        <ActionTile onClick={saveContact} icon={<UserPlus size={18} />} label="Save Contact" />
        <ActionTile
          onClick={shareCard}
          icon={shared ? <Check size={18} /> : <Share2 size={18} />}
          label={shared ? "Link Copied" : "Share Card"}
        />
      </section>

      {/* About */}
      <section className="mt-14">
        <SectionHeading eyebrow="About" title="Connecting reliable scrap with global demand" />
        <div className="card-surface mt-6 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">{profile.about}</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-secondary px-4 py-4 text-center">
                <p className="text-lg font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase leading-snug tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mt-14">
        <SectionHeading
          eyebrow="Services"
          title="What we deliver"
          subtitle="Sourcing, documentation and export coordination for international metal trade."
        />
        <div className="mt-6 space-y-3">
          {services.map((s) => (
            <div key={s} className="card-surface flex items-center gap-3 px-5 py-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-teal">
                <Activity size={16} />
              </span>
              <span className="text-sm font-medium text-foreground">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="mt-14">
        <SectionHeading
          eyebrow="Products"
          title="Product Categories"
          subtitle="Quality-focused aluminium and copper scrap grades for global industrial buyers."
        />
        <div className="mt-6 flex justify-center gap-2">
          {productCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                activeCategory === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="-mx-4 mt-5 overflow-hidden px-4 sm:-mx-6 sm:px-6">
          <div
            ref={trackRef}
            data-testid="product-track"
            className="flex cursor-grab gap-3 overflow-x-auto pb-2 active:cursor-grabbing touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...products.items, ...products.items].map((p, idx) => (
              <article
                key={`${p.name}-${idx}`}
                className="card-surface w-40 shrink-0 overflow-hidden sm:w-44"
              >
                <img
                  src={p.image}
                  alt={`${p.name} ${products.id} scrap`}
                  loading="lazy"
                  draggable={false}
                  className="h-28 w-full select-none object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold leading-snug text-foreground">{p.name}</h3>
                  <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{p.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">Swipe to explore grades</p>
      </section>

      {/* Founder */}
      <section className="mt-14">
        <SectionHeading eyebrow="Leadership" title="Founder" />
        <div className="card-surface mt-6 p-6 text-center">
          <img
            src={profile.portrait}
            alt="Biraj Gajera, Founder of Enreach Global Inc."
            className="mx-auto size-24 rounded-full border-2 border-accent/70 object-cover p-1"
          />
          <h3 className="mt-4 text-lg font-bold text-foreground">{profile.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {profile.title}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
        </div>
      </section>

      {/* Why */}
      <section className="mt-14">
        <SectionHeading eyebrow="Why Enreach Global" title="Built on trust and discipline" />
        <div className="mt-6 space-y-3">
          {whyPoints.map((w) => (
            <div key={w.title} className="card-surface p-5">
              <h3 className="text-sm font-semibold text-foreground">{w.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global presence */}
      <section className="mt-14">
        <SectionHeading eyebrow="Global Presence" title="Canadian roots, global reach" />
        <div className="card-surface mt-6 p-6">
          <p className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <MapPin size={16} className="text-accent" />
            {profile.headquarters}
          </p>
          <div className="mt-5 space-y-4">
            {presencePoints.map((p) => (
              <div key={p.title} className="rounded-xl bg-secondary p-4">
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mt-14">
        <SectionHeading eyebrow="Contact" title="Get in touch" />
        <div className="card-surface mt-6 divide-y divide-border">
          <a href={`tel:${profile.phoneRaw}`} className="flex items-center gap-3 px-5 py-4">
            <Phone size={16} className="text-accent" />
            <span className="text-sm text-foreground">{profile.phoneDisplay}</span>
          </a>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-3 px-5 py-4">
            <Mail size={16} className="text-accent" />
            <span className="break-all text-sm text-foreground">{profile.email}</span>
          </a>
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-5 py-4"
          >
            <Globe size={16} className="text-accent" />
            <span className="text-sm text-foreground">{profile.websiteLabel}</span>
          </a>
          <div className="flex items-center gap-3 px-5 py-4">
            <MapPin size={16} className="text-accent" />
            <span className="text-sm text-foreground">{profile.location}</span>
          </div>
        </div>
      </section>

      {/* QR */}
      <section className="mt-14">
        <SectionHeading eyebrow="Scan" title="Share this card" />
        <div className="card-surface mt-6 flex flex-col items-center p-6">
          <div ref={qrWrapRef} className="rounded-xl bg-card p-3">
            <QRCodeCanvas value={cardUrl} size={168} level="M" includeMargin />
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Scan to open Biraj Gajera&apos;s digital card
          </p>
          <button
            type="button"
            onClick={downloadQr}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download size={16} /> Download QR
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="card-surface mt-14 p-7 text-center">
        <h2 className="text-xl font-bold text-foreground">Ready to Trade?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Connect with Enreach Global for aluminium, copper and brass scrap sourcing, export
          coordination and industrial trading opportunities.
        </p>
        <a
          href={`https://wa.me/${profile.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Get In Touch
        </a>
      </section>

      <div className="mt-10 space-y-2 text-center">
        <p className="text-sm font-medium text-foreground">
          Designed and Developed by{" "}
          <a
            href="https://vynkcard.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-block font-bold text-primary underline-offset-2 transition-opacity hover:opacity-80 hover:underline"
          >
            Vynkcard
          </a>
        </p>
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} {profile.company}
        </p>
      </div>
    </main>
  );
}

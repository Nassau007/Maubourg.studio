// The furniture every observatory page shares: chrome, a breadcrumb back to
// the index, and the audit form at the foot.
//
// The form sits at the foot on purpose, and there is no gate anywhere above it.
// An assistant cannot read what sits behind a form, and being read by
// assistants is the entire point of this section, so the data stays open and
// the ask comes after it.

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import { getDictionary, type Locale } from '@/lib/i18n';
import { serviceMenu } from '@/lib/routes';
import { observatoryHref } from '@/lib/observatory';

export default function ObservatoryFrame({
  lang,
  showBreadcrumb = false,
  children,
}: {
  lang: Locale;
  /** Sub-pages link back to the index; the index itself does not. */
  showBreadcrumb?: boolean;
  children: React.ReactNode;
}) {
  const dict = getDictionary(lang);
  const o = dict.observatory;

  return (
    <>
      <Nav
        dict={dict.nav}
        lang={lang}
        services={serviceMenu(lang)}
        servicesLabel={dict.verticals.shared.navHeading}
      />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Link
            href={showBreadcrumb ? observatoryHref(lang) : `/${lang}`}
            className="block w-fit text-sm font-medium text-ink-500 transition-colors hover:text-ink"
          >
            {showBreadcrumb ? o.backToIndex : dict.verticals.shared.backHome}
          </Link>
        </div>

        {children}

        {/* The ask, after the data and never in front of it. */}
        <LeadForm
          anchor="audit"
          variant="audit"
          section={dict.audit}
          form={dict.audit.form}
          submitLabel={dict.audit.form.submit}
          talk={{ prefix: dict.audit.talkPrefix, link: dict.audit.talkLink }}
          sample={null}
          founder={null}
          errors={dict.errors}
          lang={lang}
        />
      </main>
      <Footer dict={dict.footer} lang={lang} hideCta />
    </>
  );
}

/** Heading block, shared by every observatory page. The lead goes in `children`. */
export function ObservatoryHead({
  eyebrow,
  title,
  facts,
  children,
}: {
  eyebrow: string;
  title: string;
  /** One short line of facts under the title, e.g. the edition's scope. */
  facts?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-content px-5 pb-10 pt-8 md:px-8 md:pb-14">
      <div className="max-w-3xl">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink md:text-6xl">
          {title}
        </h1>
        {facts && <p className="mt-5 text-sm font-medium text-ink-500">{facts}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

import PublicPageLayout from '@/components/PublicPageLayout';

export const metadata = {
  title: 'Cookie Policy – SmartHire',
  description: 'How SmartHire uses cookies and similar tracking technologies.',
};

export default function CookiePolicy() {
  return (
    <PublicPageLayout>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Cookie Policy</h1>
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Last updated:</span>{' '}
            <time dateTime="2026-04-24">April 24, 2026</time>
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit SmartHire. They help us keep you signed in, remember your preferences, and understand how the platform is used.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies We Use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential cookies</strong> — Required for authentication (Clerk) and session management. Cannot be disabled.</li>
              <li><strong>Analytics cookies</strong> — Vercel Analytics tracks aggregate page views and performance. No personal data is stored.</li>
              <li><strong>Preference cookies</strong> — Store UI settings like sidebar state across sessions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Cookies</h2>
            <p>We use Clerk for authentication, which may set its own cookies. See <a href="https://clerk.com/privacy" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Clerk's privacy policy</a> for details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Managing Cookies</h2>
            <p>You can disable cookies in your browser settings. Note that disabling essential cookies will prevent you from signing in to SmartHire.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p>Questions about this policy? Email <a href="mailto:contact@smarthire.website" className="text-emerald-600 hover:underline">contact@smarthire.website</a>.</p>
          </section>
        </div>
      </main>
    </PublicPageLayout>
  );
}

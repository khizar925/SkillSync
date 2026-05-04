import PublicNavbar from '@/components/PublicNavbar';
import Footer from '@/components/sections/Footer';

export default function PublicPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <div className="pt-24">
        {children}
      </div>
      <Footer />
    </div>
  );
}

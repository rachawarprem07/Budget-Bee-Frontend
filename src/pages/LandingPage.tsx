import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AboutUs } from "@/components/landing/AboutUs";
import { Footer } from "@/components/landing/Footer";

function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-background text-brand-charcoal">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <AboutUs />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;

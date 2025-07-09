
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CreatorShowcase from "@/components/CreatorShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  console.log("Index component rendering");
  
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <CreatorShowcase />
      <Footer />
    </div>
  );
};

export default Index;

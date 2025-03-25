import { Hero } from "@/components/hero";
import { CategoryNav } from "@/components/category-nav";
import { ShoppingAssistant } from "@/components/shopping-assistant";
// import { ReviewCarousel } from "@/components/review-carousel";
import { FooterCategories } from "@/components/footer-categories";
import { Navbar } from "@/components/layout/navbar/navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoryNav />
      {/* <SeasonalCategories /> */}
      <ShoppingAssistant />
      {/* <ReviewCarousel /> */}
      <FooterCategories />
      {/* <Newsletter /> */}
      <Footer />
    </>
  );
}

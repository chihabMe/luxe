import { Hero } from "@/components/hero"
import { CategoryNav } from "@/components/category-nav"
import { SeasonalCategories } from "@/components/seasonal-categories"
import { ShoppingAssistant } from "@/components/shopping-assistant"
import { ReviewCarousel } from "@/components/review-carousel"
import { FooterCategories } from "@/components/footer-categories"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryNav />
      {/* <PromoBanners /> */}
      {/* <BrandShowcase /> */}
      <SeasonalCategories />
      <ShoppingAssistant />
      <ReviewCarousel />
      <FooterCategories />
      <Newsletter />
    </div>
  )
}


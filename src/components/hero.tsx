import { getAllMainCategories } from "@/app/data/main-categories-data";
import * as motion from "motion/react-m";
import Image from "next/image";
import Link from "next/link";

export async function Hero() {
  const mainCategories = await getAllMainCategories();
  
  return (
    <section 
      className="relative bg-[#FFF1F1] overflow-hidden py-16 md:py-24" 
      aria-label="Promotions principales"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD6D6] rounded-full -mr-32 -mt-32 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD6D6] rounded-full -ml-24 -mb-24 opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Semantic heading structure with microdata */}
            <div itemScope itemType="https://schema.org/Product">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" itemProp="name">
                Faites place<br />
                aux <span className="text-[#FF5A5A]">nouveautés</span>
              </h1>
              <p className="text-lg text-gray-700 max-w-xl mt-4" itemProp="description">
                Découvrez notre nouvelle collection printemps 2025 et profitez de réductions exclusives jusqu'à 30%
              </p>
              <meta itemProp="brand" content="Your Brand Name" />
            </div>
            
            {/* CTA with better visual treatment */}
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/collection"
                className="inline-block bg-[#FF5A5A] text-white px-8 py-4 rounded-full hover:bg-[#ff3a3a] transition-all hover:shadow-lg font-medium text-lg"
                aria-label="Découvrir la nouvelle collection"
              >
                Découvrir
              </Link>
              <Link
                href="/promotions"
                className="inline-flex items-center text-[#FF5A5A] font-medium hover:underline"
                aria-label="Voir toutes les promotions"
              >
                <span>Voir les promotions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Categories with improved layout and animations */}
            <div className="pt-4">
              <h2 className="text-sm uppercase tracking-wider text-gray-600 mb-3 font-medium">
                Catégories populaires
              </h2>
              <div className="flex flex-wrap gap-3">
                {mainCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/products/${category.slug}`}
                      className="inline-block px-6 py-2 rounded-full ring-2 hover:text-white ring-[#FF7B7B]/90 text-[#FF7B7B] font-medium hover:bg-[#FF7B7B] transition-colors"
                      aria-label={`Voir la catégorie ${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Fixed image grid layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full mx-auto lg:ml-auto"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src="/hero-image-1.webp"
                  alt="Nouvelle collection printemps 2025 - Pièce phare"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
                
                {/* Sale badge on first image */}
                <div className="absolute top-4 right-4 bg-[#FF5A5A] text-white text-sm font-bold py-1 px-3 rounded-full">
                  -30%
                </div>
              </motion.div>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src="/hero-image-2.webp"
                    alt="Offres spéciales et réductions exclusives"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg bg-white/10 flex items-center justify-center p-4"
                >
                  <div className="text-center">
                    <p className="text-[#FF5A5A] font-bold text-lg">Nouveautés</p>
                    <p className="text-sm text-gray-600 mt-1">Collection Printemps</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">2025</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Trust badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 py-6 border-t border-[#FFD6D6]/50"
        >
            {[
              { icon: "🚚", text: "Livraison gratuite" },
              { icon: "💳", text: "Paiement à la livraison" },
              { icon: "🔄", text: "Retours faciles" }
            ].map((badge, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="flex items-center gap-2"
              >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm text-gray-700 font-medium">{badge.text}</span>
              </motion.div>
            ))}
        </motion.div>
      </div>
      
      {/* Structured data for SEO */}
    </section>
  );
}
import * as motion from "motion/react-m";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getAllMainCategories } from "@/app/data/main-categories-data";

export async function CategoryNav() {
  const mainCategories = await getAllMainCategories();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Nos Catégories</h2>
          <p className="text-muted-foreground max-w-lg">
            Découvrez notre sélection de vêtements et accessoires pour tous les
            styles
          </p>
        </div>

        {/* Main Categories with Subcategories */}
        <div className="space-y-16">
          {mainCategories
            .filter((main) => main.isActive && main.categories.length > 0)
            .map((mainCategory, mainIndex) => (
              <div key={mainCategory.id} className="space-y-8">
                {/* Main Category Heading */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * mainIndex }}
                      viewport={{once:true}}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">{mainCategory.name}</h3>
                    <div className="h-px w-12 bg-gray-300"></div>
                    <span className="text-sm text-gray-500">
                      {mainCategory.categories.length} collections
                    </span>
                  </div>
                  <Link
                    href={`/products/${mainCategory.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-[#FF7B7B] hover:underline"
                  >
                    Voir tout <ChevronRight className="h-4 w-4" />
                  </Link>
                </motion.div>

                {/* Subcategories Grid */}
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {mainCategory.categories.map((category, index) => (
                    <motion.li
                      initial={{ opacity: 0.7, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{once:true}}
                      key={category.id}
                    >
                      <Link
                        href={`/products/${mainCategory.slug}/${category.slug}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.05 + mainIndex * 0.1,
                          }}
                          className="group relative flex flex-col"
                        >
                          {/* Main card with gradient overlay */}
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-sm"
                          >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                              <Image
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent" />

                            {/* Featured Tag if applicable */}
                            {category.isFeatured && (
                              <div className="absolute top-3 left-3 bg-[#FF7B7B] text-white text-xs font-medium px-2 py-1 rounded">
                                Populaire
                              </div>
                            )}

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                              <div className="space-y-1 relative z-10">
                                <h4 className="text-base font-semibold tracking-wide">
                                  {category.name}
                                </h4>
                                <div className="flex items-center text-xs font-medium opacity-90 pt-1">
                                  <span className="flex items-center gap-1">
                                    Découvrir <ArrowRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Hover Effect Circle */}
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 
                                   backdrop-blur-sm opacity-0 group-hover:opacity-100 
                                   flex items-center justify-center"
                            >
                              <ArrowRight className="w-4 h-4 text-white" />
                            </motion.div>
                          </motion.div>

                          {/* Bottom shine effect */}
                          <motion.div
                            initial={{ width: "0%", opacity: 0 }}
                            whileHover={{ width: "100%", opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent 
                                 via-[#FF7B7B]/50 to-transparent opacity-0"
                          />
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#FF7B7B] hover:bg-[#ff6b6b] text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <div className="flex  items-center gap-2">
              <span>Découvrir toutes nos collections</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

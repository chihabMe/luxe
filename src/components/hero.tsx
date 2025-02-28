import * as motion from "motion/react-m";
import Image from "next/image";
import Link from "next/link";

const featuredCategories = [
  { title: "L'occasion offerte dès 50€", discount: "-80%" },
  { title: "Livraison offerte dès 50€", text: "Expédition sous 48h" },
  { title: "Bon sens", text: "aussi stylé" },
];
const mainCategories = [
  { title: "HOMME", href: "/homme" },
  { title: "FILLE", href: "/fille" },
  { title: "GARÇON", href: "/garcon" },
];

export function Hero() {
  return (
    <section className="relative bg-[#FFF1F1] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Faites place
              <br />
              aux nouveautés
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Découvrez notre nouvelle collection et profitez de réductions exclusives
            </p>
            <Link
              href="/collection"
              className="inline-block bg-[#FF7B7B] text-white px-8 py-3 rounded-full hover:bg-[#ff6b6b] transition-colors"
            >
              Découvrir
            </Link>
            <div className="flex flex-wrap gap-3">
              {mainCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={category.href}
                    className="inline-block px-8 py-3 rounded-full ring-2 hover:text-white ring-[#FF7B7B]/90 text-[#FF7B7B] font-medium hover:bg-[#FF7B7B] transition-colors"
                  >
                    {category.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Optimized Image Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[500px] mx-auto lg:ml-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="relative w-full h-[280px] rounded-xl overflow-hidden "
                >
                  <Image
                    src={`/hero-image-${index}.webp`}
                    alt={`Category ${index}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 280px, 400px"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative grid md:grid-cols-3 gap-4 mt-8"
        >
          {featuredCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
              {category.discount ? (
                <span className="text-[#FF7B7B] text-2xl font-bold">{category.discount}</span>
              ) : (
                <p className="text-gray-600">{category.text}</p>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

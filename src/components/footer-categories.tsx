"use client"

import * as motion from "motion/react-m"
import Link from "next/link"

const categories = {
  femme: {
    title: "Pour femme",
    items: [
      "Robes",
      "Pantalons",
      "Lingerie",
      "Chemises",
      "Chaussures",
      "Gilets",
      "T-shirts",
      "Vestes",
      "Jupes",
      "Jeans",
      "Pulls",
    ],
  },
  homme: {
    title: "Pour homme",
    items: [
      "Manteaux",
      "Pantalons",
      "Lingerie",
      "Chemises",
      "Chaussures",
      "Gilets",
      "T-shirts",
      "Vestes",
      "Shorts et bermudas",
      "Jeans",
      "Pulls",
    ],
  },
}

const brands = [
  ["L33", "C'est Beau la Vie", "Gant", "Vero Moda"],
  ["La Fée Maraboutée", "Vila", "Mado et les Autres", "Virginie & Moi"],
  ["Simone Pérèle", "Palme", "Rose Pomme", "Only"],
  ["Chantelle", "Guy Dubois", "Weinberg", "Triumph"],
  ["Griffon", "Lou", "Gl'Oze", "So Essential"],
  ["Diane Laury", "Lise Charmel", "Betty Barclay", "Benetton"],
  ["Karting", "Desigual", "Maloka", "Autour d'Elle"],
  ["Christine Laure"],
]

export function FooterCategories() {
  return (
    <section className="py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Categories */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold mb-8">Nos catégories de vêtements et chaussures</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {Object.values(categories).map((category) => (
                <div key={category.title}>
                  <h3 className="font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-gray-600 hover:text-gray-900 hover:underline">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-8">Nos marques de vêtements et chaussures</h2>
            <div className="grid grid-cols-4 gap-6">
              {brands.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-2">
                  {column.map((brand) => (
                    <li key={brand}>
                      <Link href="#" className="text-gray-600 hover:text-gray-900 hover:underline">
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <Link href="#" className="inline-block mt-6 text-gray-600 hover:text-gray-900 hover:underline">
              Voir plus
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


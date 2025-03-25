import { getAllMainCategories } from "@/app/data/main-categories-data"
import * as motion from "motion/react-m"
import Link from "next/link"

export async function FooterCategories() {
  const mainCategories = await getAllMainCategories()
  
  return (
    <section className="py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-1 gap-12">
          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-8">Nos catégories de vêtements et chaussures</h2>
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              {mainCategories.map((mainCategory) => (
                <div key={mainCategory.id}>
                  <h3 className="font-bold mb-4">{mainCategory.name}</h3>
                  <ul className="space-y-2">
                    {mainCategory.categories.map((category) => (
                      <li key={category.id}>
                        <Link 
                          href={`/categories/${category.slug}`} 
                          className="text-gray-600 hover:text-gray-900 hover:underline"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
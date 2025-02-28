"use client"

import * as motion from "motion/react-m"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
const subCategories = [
  "Robes",
  "Manteaux",
  "Chaussures",
  "Accessoires",
  "Sport",
  "Beauté",
  "Homme",
  "Femme",
  "Enfant",
  "Bébé",
  "Maison",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

export default function ProductFilters() {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg">Catégories</h3>
        </CardHeader>
        <CardContent>
          <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
            {subCategories.map((category, index) => (
              <motion.li key={index} variants={itemVariants}>
                <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                  {category}
                  <ChevronRight size={16} className="ml-auto" />
                </Button>
              </motion.li>
            ))}
          </motion.ul>
          <Button variant="link" className="mt-4 text-sm text-gray-600">
            En savoir plus
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg">Filtrer par</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 flex justify-between">
                <span>Prix</span>
                <ChevronDown size={16} />
              </h4>
              <div className="pl-2 space-y-1">
                <div className="flex items-center">
                  <input type="checkbox" id="price1" className="mr-2" />
                  <label htmlFor="price1" className="text-sm">
                    Moins de 50€
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price2" className="mr-2" />
                  <label htmlFor="price2" className="text-sm">
                    50€ - 100€
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price3" className="mr-2" />
                  <label htmlFor="price3" className="text-sm">
                    100€ - 200€
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price4" className="mr-2" />
                  <label htmlFor="price4" className="text-sm">
                    Plus de 200€
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 flex justify-between">
                <span>Marques</span>
                <ChevronDown size={16} />
              </h4>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 flex justify-between">
                <span>Couleurs</span>
                <ChevronDown size={16} />
              </h4>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 flex justify-between">
                <span>Tailles</span>
                <ChevronDown size={16} />
              </h4>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-black text-white hover:bg-gray-800">Appliquer les filtres</Button>
        </CardFooter>
      </Card>
    </>
  )
}


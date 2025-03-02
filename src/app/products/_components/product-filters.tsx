"use client"
import * as motion from "motion/react-m"
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { getAllMainCategories } from "@/app/data/main-categories-data"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger, 
} from "@/components/ui/collapsible"
import Link from "next/link"

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

export default function ProductFilters({mainCategories}:{mainCategories:Awaited<ReturnType<typeof getAllMainCategories>>}) {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({})

  const toggleCategory = (categoryId:string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg">Catégories</h3>
        </CardHeader>
        <CardContent>
          <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
            {mainCategories.map((mainCategory) => (
              <motion.li key={mainCategory.id} variants={itemVariants} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                <Collapsible
                  open={expandedCategories[mainCategory.id]}
                  onOpenChange={() => toggleCategory(mainCategory.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start hover:bg-gray-100 font-medium"
                    >
                      {mainCategory.name}
                      {expandedCategories[mainCategory.id] ? 
                        <ChevronUp size={16} className="ml-auto" /> : 
                        <ChevronDown size={16} className="ml-auto" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <motion.ul 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 mt-1 space-y-1"
                    >
                      {mainCategory.categories && mainCategory.categories.map((subCategory) => (
                        <motion.li key={subCategory.id} >
                          <Button 
                            variant="ghost" 
                            asChild
                            className="w-full justify-start text-sm py-1 h-auto hover:bg-gray-100 text-gray-700"
                          >
                            <Link href={`/products/${mainCategory.slug}/${subCategory.slug}`}>
                            {subCategory.name}
                            {/* <ChevronRight size={14} className="ml-auto" /> */}
                            </Link>
                          </Button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CollapsibleContent>
                </Collapsible>
              </motion.li>
            ))}
          </motion.ul>
          <Button variant="link" className="mt-4 text-sm text-gray-600">
            Voir toutes les catégories
          </Button>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg">Filtrer par</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            
            <ShadcnFilterSection title="Marques">
              <div className="pl-2 space-y-2">
                <ShadcnCheckboxItem id="brand1" label="Nike" />
                <ShadcnCheckboxItem id="brand2" label="Adidas" />
                <ShadcnCheckboxItem id="brand3" label="Puma" />
                <ShadcnCheckboxItem id="brand4" label="New Balance" />
              </div>
            </ShadcnFilterSection>
            
            <ShadcnFilterSection title="Couleurs">
              <div className="pl-2 pt-2 flex flex-wrap gap-2">
                {["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#FFFF00", "#008000"].map((color, index) => (
                  <div 
                    key={index} 
                    className="w-6 h-6 rounded-full cursor-pointer border border-gray-300" 
                    style={{ backgroundColor: color }}
                    title={getColorName(color)}
                  />
                ))}
              </div>
            </ShadcnFilterSection>
            
            <ShadcnFilterSection title="Tailles">
              <div className="pl-2 pt-2 flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <div key={size} className="border border-gray-300 rounded px-2 py-1 text-xs cursor-pointer hover:bg-gray-100">
                    {size}
                  </div>
                ))}
              </div>
            </ShadcnFilterSection>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-black text-white hover:bg-gray-800">Appliquer les filtres</Button>
        </CardFooter>
      </Card>
    </>
  )
}

// Helper components using shadcn
const ShadcnFilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true)
  
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center cursor-pointer">
          <h4 className="text-sm font-medium">{title}</h4>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

const ShadcnCheckboxItem = ({ id, label }: { id: string; label: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

// Helper function to get color names
const getColorName = (hexColor: string): string => {
  const colorMap: { [key: string]: string } = {
    "#000000": "Noir",
    "#FFFFFF": "Blanc",
    "#FF0000": "Rouge",
    "#0000FF": "Bleu",
    "#FFFF00": "Jaune",
    "#008000": "Vert"
  }
  return colorMap[hexColor] || "Couleur";
}
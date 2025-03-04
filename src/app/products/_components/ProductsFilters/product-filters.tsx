"use client"

import * as motion from "motion/react-m"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState, useEffect, Suspense } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { getAllMainCategories } from "@/app/data/main-categories-data"
import type { getProductMarks } from "@/app/data/products-data"
import MarksFilters from "./MarksFilters"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export default function ProductFilters({
  mainCategories,
  marks,
}: {
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>
  marks: Awaited<ReturnType<typeof getProductMarks>>
}) {
  const params = useParams()
  const categories = params?.categories as string[] || []
  const currentMainCategory = categories[0]
  const currentSubCategory = categories[1]

  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean
  }>({})

  // Set initial expanded state based on current category
  useEffect(() => {
    if (currentMainCategory) {
      const currentCategory = mainCategories.find(cat => cat.slug === currentMainCategory)
      if (currentCategory) {
        setExpandedCategories(prev => ({
          ...prev,
          [currentCategory.id]: true
        }))
      }
    }
  }, [currentMainCategory, mainCategories])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  if (!mainCategories || mainCategories.length === 0) {
    return <p className="text-gray-600">Aucune catégorie disponible.</p>
  }

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <Card className="border-0 shadow-none md:border md:shadow-sm">
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg">Catégories</h3>
        </CardHeader>
        <CardContent>
          <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-1">
            {mainCategories.map((mainCategory) => {
              const isMainCategoryActive = mainCategory.slug === currentMainCategory
              
              return (
                <motion.li
                  key={mainCategory.id}
                  variants={itemVariants}
                  className="border-b border-gray-100 last:border-0"
                >
                  <Collapsible
                    open={expandedCategories[mainCategory.id]}
                    onOpenChange={() => toggleCategory(mainCategory.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start font-medium text-left",
                          isMainCategoryActive 
                            ? "bg-primary/10 hover:bg-primary/15 text-primary" 
                            : "hover:bg-gray-50"
                        )}
                        aria-expanded={expandedCategories[mainCategory.id]}
                      >
                        <span className="truncate">{mainCategory.name}</span>
                        {expandedCategories[mainCategory.id] ? (
                          <ChevronUp size={16} className="ml-auto flex-shrink-0" />
                        ) : (
                          <ChevronDown size={16} className="ml-auto flex-shrink-0" />
                        )}
                      </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 py-1 space-y-1"
                      >
                        {mainCategory.categories?.map((subCategory) => {
                          const isSubCategoryActive = 
                            isMainCategoryActive && 
                            subCategory.slug === currentSubCategory

                          return (
                            <motion.li key={subCategory.id}>
                              <Button
                                variant="ghost"
                                asChild
                                className={cn(
                                  "w-full justify-start text-sm py-1.5 h-auto",
                                  isSubCategoryActive 
                                    ? "bg-primary/10 hover:bg-primary/15 text-primary font-medium" 
                                    : "hover:bg-gray-50 text-gray-700"
                                )}
                              >
                                <Link 
                                  href={`/products/${mainCategory.slug}/${subCategory.slug}`} 
                                  className="truncate"
                                >
                                  {subCategory.name}
                                </Link>
                              </Button>
                            </motion.li>
                          )
                        })}
                      </motion.ul>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.li>
              )
            })}
          </motion.ul>
        </CardContent>
      </Card>

      {/* Marks Filter */}
      <Suspense fallback={<></>}>
      <MarksFilters marks={marks} />
      </Suspense>
    </div>
  )
}

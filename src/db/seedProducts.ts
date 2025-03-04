import { db } from ".";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import {  fakerFR as faker} from '@faker-js/faker';
import { 
  mainCategories, 
  categories, 
  products, 
  productSpecifications, 
  specificationValues, 
  productImages 
} from "./schema";
import { eq } from "drizzle-orm";

// Configure faker to use French locale
// faker.locale = 'fr'; // No longer necessary with fakerFR

// Define main categories (in French)
const mainCategoriesData = [
  { name: "Hommes", slug: "hommes" },
  { name: "Garçons", slug: "garcons" },
  { name: "Filles", slug: "filles" }
];

// Popular clothing brands
const brands = [
  { name: "Louis Vuitton", slug: "louis-vuitton" },
  { name: "Chanel", slug: "chanel" },
  { name: "Hermès", slug: "hermes" },
  { name: "Dior", slug: "dior" },
  { name: "Lacoste", slug: "lacoste" },
  { name: "Zara", slug: "zara" },
  { name: "H&M", slug: "h-et-m" },
  { name: "Decathlon", slug: "decathlon" },
  { name: "Kiabi", slug: "kiabi" },
  { name: "Petit Bateau", slug: "petit-bateau" },
  { name: "Bonpoint", slug: "bonpoint" },
  { name: "Jacadi", slug: "jacadi" },
  { name: "Sergent Major", slug: "sergent-major" },
  { name: "Du Pareil au Même", slug: "du-pareil-au-meme" },
  { name: "Nike", slug: "nike" },
  { name: "Adidas", slug: "adidas" },
  { name: "Puma", slug: "puma" },
  { name: "Gucci", slug: "gucci" },
  { name: "Balenciaga", slug: "balenciaga" },
  { name: "Uniqlo", slug: "uniqlo" }
];

// Color options in French
const colors = [
  "Noir", "Blanc", "Rouge", "Bleu", "Vert", "Jaune", "Orange", 
  "Rose", "Violet", "Marron", "Gris", "Beige", "Turquoise", 
  "Bordeaux", "Marine", "Kaki", "Corail", "Crème", "Doré", "Argenté"
];

// Size options based on category
const sizesByCategory = {
  hommes: ["S", "M", "L", "XL", "XXL", "XXXL", "38", "40", "42", "44", "46", "48", "50"],
  garcons: ["2 ans", "3 ans", "4 ans", "5 ans", "6 ans", "8 ans", "10 ans", "12 ans", "14 ans", "16 ans"],
  filles: ["2 ans", "3 ans", "4 ans", "5 ans", "6 ans", "8 ans", "10 ans", "12 ans", "14 ans", "16 ans"]
};

// Create specific category names for each main category
const categoryNames = {
  hommes: [
    "Chemises", "Pantalons", "T-shirts", "Vestes", "Costumes", 
    "Chaussures", "Sous-vêtements", "Accessoires", "Pulls", "Manteaux"
  ],
  garcons: [
    "T-shirts", "Pantalons", "Sweatshirts", "Chaussures", "Vestes", 
    "Pyjamas", "Sous-vêtements", "Maillots de bain", "Accessoires", "Manteaux"
  ],
  filles: [
    "Robes", "T-shirts", "Jupes", "Pantalons", "Chaussures", 
    "Accessoires", "Pyjamas", "Sous-vêtements", "Maillots de bain", "Manteaux"
  ]
};

// Generate placeholder image URLs
const generateImageUrl = () => {
  return `https://picsum.photos/800/800`;
};

// Generate a unique slug
const generateUniqueSlug = (name: string, uniqueSuffix: string = '') => {
  const baseSlug = slugify(name, { lower: true, strict: true });
  return uniqueSuffix ? `${baseSlug}-${uniqueSuffix}` : baseSlug;
};

// Generate a descriptive product description in French
const generateProductDescription = (name: string, brand: string, category: string) => {
  const quality = faker.helpers.arrayElement([
    "haute qualité", "qualité supérieure", "qualité exceptionnelle", 
    "confort optimal", "élégance intemporelle", "style contemporain"
  ]);
  
  const material = faker.helpers.arrayElement([
    "100% coton", "polyester respirant", "coton biologique", 
    "laine mérinos", "soie délicate", "matière synthétique durable", 
    "lin frais", "viscose légère", "denim robuste", "cuir véritable"
  ]);
  
  const occasion = faker.helpers.arrayElement([
    "parfait pour tous les jours", "idéal pour les occasions spéciales", 
    "adapté aux événements formels", "conçu pour le confort quotidien",
    "parfait pour le sport", "idéal pour la détente"
  ]);
  
  return `${name} de ${brand} - ${quality}. 
  
Ce ${category} est fabriqué en ${material} pour garantir durabilité et confort. ${occasion}, ce vêtement vous accompagnera dans toutes vos activités.

Caractéristiques principales:
- Design élégant et moderne
- ${material}
- Facile d'entretien
- Coupe confortable et ajustée
- Fabrication soignée

Instructions d'entretien:
${faker.helpers.arrayElement([
  "Lavage en machine à 30°C, ne pas utiliser de javel, séchage à basse température.",
  "Lavage à la main recommandé, séchage à plat, repassage à basse température.",
  "Lavage en machine à 40°C, repassage possible, ne pas nettoyer à sec."
])}

Référence: ${faker.string.alphanumeric(8).toUpperCase()}`;
};

/**
 * Main seed function to populate the database
 */
export const seedProducts = async () => {
  console.log("🌱 Starting to seed the database with French product data...");
  
  
  // 1. Insert main categories
  console.log("Creating main categories...");
  const mainCategoryIds: { [key: string]: string } = {};
  
  for (const mainCategory of mainCategoriesData) {
    // Check if the main category already exists
    const existingMainCategory = await db.select().from(mainCategories).where(eq(mainCategories.slug,mainCategory.slug)).limit(1);
    
    if (!existingMainCategory.length) {
      const mainCategoryId = uuidv4();
      mainCategoryIds[mainCategory.slug] = mainCategoryId;
      
      await db.insert(mainCategories).values({
        id: mainCategoryId,
        name: mainCategory.name,
        slug: mainCategory.slug,
        isActive: true
      });
    } else {
      console.log(`Main category "${mainCategory.name}" already exists, skipping.`);
      mainCategoryIds[mainCategory.slug] = existingMainCategory[0].id;
    }
  }
  
  // 2. Insert categories
console.log("Creating categories...");
const categoryIds: { [key: string]: string } = {};

for (const [mainCategorySlug, mainCategoryId] of Object.entries(mainCategoryIds)) {
    const categoryNamesForMainCategory = categoryNames[mainCategorySlug as keyof typeof categoryNames];
    
    for (const categoryName of categoryNamesForMainCategory) {
        const categorySlug = generateUniqueSlug(categoryName);
        const categoryKey = `${mainCategorySlug}-${categorySlug}`;
        
        // Check if the category already exists
        const existingCategory = await db.select().from(categories).where(eq(categories.slug, categorySlug)).limit(1);
        
        if (!existingCategory.length) {
            const categoryId = uuidv4();
            categoryIds[categoryKey] = categoryId;
            
            await db.insert(categories).values({
                id: categoryId,
                name: categoryName,
                slug: categorySlug,
                image: generateImageUrl(),
                isFeatured: Math.random() > 0.7, // 30% chance of being featured
                mainCategoryId: mainCategoryId
            });
        } else {
            console.log(`Category "${categoryName}" already exists, skipping.`);
            categoryIds[categoryKey] = existingCategory[0].id;
        }
    }
}
  
  // 3. Insert products
  console.log("Creating 100 products with specifications and images...");
  let productCount = 0;
  
  while (productCount < 100) {
    // Randomly select a main category
    const mainCategorySlug = faker.helpers.arrayElement(Object.keys(mainCategoryIds));
    const mainCategoryId = mainCategoryIds[mainCategorySlug] as string;
    
    // Randomly select a category within the main category
    const categoryKeys = Object.keys(categoryIds).filter(key => key.startsWith(mainCategorySlug));
    const categoryKey = faker.helpers.arrayElement(categoryKeys);
    const categoryId = categoryIds[categoryKey] as string;
    const categoryName = categoryKey.split('-').slice(1).join('-');
    
    // Randomly select a brand
    const brand = faker.helpers.arrayElement(brands);
    
    // Generate product details
    const productName = `${faker.commerce.productAdjective()} ${faker.helpers.arrayElement(categoryNames[mainCategorySlug as keyof typeof categoryNames])} ${faker.commerce.productAdjective()}`;
    const productSlug = generateUniqueSlug(productName, faker.string.alphanumeric(5));
    const isFeatured = Math.random() > 0.8; // 20% chance of being featured
    
    const productId = uuidv4();
    
    // Insert the product
    await db.insert(products).values({
      id: productId,
      name: productName,
      mark: brand.name,
      markSlug: brand.slug,
      slug: productSlug,
      description: generateProductDescription(productName, brand.name, categoryName),
      isFeatured,
      categoryId,
      mainCategoryId
    });
    
    // 4. Insert product specifications (colors)
    const colorSpecId = uuidv4();
    await db.insert(productSpecifications).values({
      id: colorSpecId,
      productId,
      name: "Couleur"
    });
    
    // Insert 2-4 random colors for this product
    const numColors = 2 + Math.floor(Math.random() * 3);
    const productColors = faker.helpers.arrayElements(colors, numColors);
    
    for (const color of productColors) {
      await db.insert(specificationValues).values({
        id: uuidv4(),
        specificationId: colorSpecId,
        value: color
      });
    }
    
    // 5. Insert product specifications (sizes)
    const sizeSpecId = uuidv4();
    await db.insert(productSpecifications).values({
      id: sizeSpecId,
      productId,
      name: "Taille"
    });
    
    // Insert 3-6 random sizes for this product
    const sizesForCategory = sizesByCategory[mainCategorySlug as keyof typeof sizesByCategory];
    const numSizes = 3 + Math.floor(Math.random() * 4);
    const productSizes = faker.helpers.arrayElements(sizesForCategory, numSizes);
    
    for (const size of productSizes) {
      await db.insert(specificationValues).values({
        id: uuidv4(),
        specificationId: sizeSpecId,
        value: size
      });
    }
    
    // 6. Insert product images (3-5 images per product)
    const numImages = 3 + Math.floor(Math.random() * 3);
    const mainImageIndex = Math.floor(Math.random() * numImages);
    
    for (let i = 0; i < numImages; i++) {
      const cloudId = `product_${productCount}_image_${i}`;
      await db.insert(productImages).values({
        id: uuidv4(),
        productId,
        url: generateImageUrl(),
        cloudId,
        isMain: i === mainImageIndex
      });
    }
    
    productCount++;
    if (productCount % 10 === 0) {
      console.log(`Created ${productCount} products...`);
    }
  }
  
  console.log(`✅ Successfully seeded database with:`);
  console.log(`- ${Object.keys(mainCategoryIds).length} main categories`);
  console.log(`- ${Object.keys(categoryIds).length} categories`);
  console.log(`- 100 products with specifications and images`);
  console.log(`- ${brands.length} brands used`);
};

// Function to run all seeding operations
export const seed = async () => {
  console.log("🚀 Starting database seeding process");
  try {
    // Add your registerAdminUser function here if needed
    // await registerAdminUser();
    
    await seedProducts();
    
    console.log("✅ Database seeding completed successfully");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seed().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
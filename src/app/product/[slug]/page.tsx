// ProductDetails.tsx (Server Component)
import React from "react";
import { Navbar } from "@/components/layout/navbar/navbar";
import Footer from "@/components/Footer";
import { getProductDetailWithSlug, getRecommendedProducts } from "@/app/data/products-data";
import { notFound } from "next/navigation";
import ProductImageGallery from "../_components/ProductImageGallery";
import ProductInfo from "../_components/ProductInfo";
import RecommendedProducts from "../_components/RecommendedProducts";

// Sample recommended products data

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  // Fetch product data
  const {slug} = await params
  const product = await getProductDetailWithSlug(slug);
  if(!product)return notFound()

  const recommendedProducts = await getRecommendedProducts(slug)
  
  // Extract sizes from product specifications
  const sizesSpec = product.specifications.find(spec => {
    const lowerName = spec.name.toLowerCase();
    return lowerName.includes("size") || 
           lowerName.includes("taille") ||
           lowerName.includes("pointure") || 
           lowerName.includes("dimension");
  });
  const colorSpec = product.specifications.find(spec => {
    const lowerName = spec.name.toLowerCase();
    return lowerName.includes("color") || 
           lowerName.includes("couleur");
  });
  
  // Get color value, or empty string if not found
  const color = colorSpec?.values?.map(val => val.value).join(", ") || "";
  // Extract other important specifications
  
  const restSpects = product.specifications.filter(spec => {
    const lowerName = spec.name.toLowerCase();
    return !lowerName.includes("size") && 
           !lowerName.includes("taille") &&
           !lowerName.includes("pointure") && 
           !lowerName.includes("dimension") &&
           !lowerName.includes("color") && 
           !lowerName.includes("couleur");
  }
  )

  
  
  
  // Available sizes (placeholder if not found in specifications)
  const availableSizes = sizesSpec?.values?.map(val => val.value) || ["S", "M", "L", "XL"];
  
  // Product images from the database or use placeholders if empty
  const images = product.images.length > 0 
    ? product.images.map(img => img.url) 
    : ["/api/placeholder/500/500", "/api/placeholder/500/500", "/api/placeholder/500/500"];

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Product Images */}
        <ProductImageGallery
          images={images} 
        />

        {/* Right - Product Info */}
        <ProductInfo
          product={product}
          availableSizes={availableSizes}
          color={color}
          restSpects={restSpects}
        />
      </div>

      <RecommendedProducts products={recommendedProducts} />

    </div>
    <Footer />
    </>
  );
};

export default ProductDetails;


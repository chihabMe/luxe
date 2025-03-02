
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-m";

export default function PromotionalBanner() {
  return (
    <motion.div
      className="bg-pink-100 text-center py-16 mb-8 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-2">
        Les bonnes affaires de la seconde main
      </h2>
      <p className="text-xl mb-6">jusqu&rsquo;à</p>
      <p className="text-5xl font-bold text-pink-600 mb-2">-80%</p>
      <p className="mb-6">du prix boutique d&apos;origine</p>
      <Button className="bg-black text-white hover:bg-gray-800">
        Découvrir
      </Button>
    </motion.div>
  );
}

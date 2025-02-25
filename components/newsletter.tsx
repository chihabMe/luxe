export function Newsletter() {
  return (
    <section className="bg-[#FF7B7B] py-12">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-2xl font-medium mb-6">L air entier du bon sens de la mode, c est par ici !</h2>
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 px-4 py-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-[#FF7B7B] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
            S inscrire
          </button>
        </div>
      </div>
    </section>
  )
}


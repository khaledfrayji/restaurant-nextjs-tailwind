export default function About() {
    return (
      <div className="bg-orange-700 py-10 text-white min-h-screen flex flex-col items-center justify-center px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to BurgerWing</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Where burgers and wings meet perfection! Our passion is serving you the freshest, most delicious meals in a cozy atmosphere.
          </p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <img
              src="/signature.jpg"
              alt="Signature Dish"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <h2 className="text-2xl font-semibold mt-6">Our Cozy Ambience</h2>
            <p className="mt-4 text-base md:text-lg">
              Sit back, relax, and enjoy a meal in our warm and inviting space, designed to make you feel right at home.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/seo.png"
              alt="Logo"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <h2 className="text-2xl font-semibold mt-6">Our Signature Dishes</h2>
            <p className="mt-4 text-base md:text-lg">
              From our juicy burgers to our crispy wings, every bite is packed with flavor and crafted with care.
            </p>
          </div>
        </section>
        <section className="mt-12 text-center max-w-4xl">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="mt-6 text-base md:text-lg">
            Founded with a love for great food and great company, BurgerWing is more than just a restaurant—it's a destination for
            food lovers. Whether you're here for a quick bite or a family feast, we're dedicated to making every visit special.
          </p>
        </section>
        <footer className="mt-12 text-center text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} BurgerWing. All rights reserved.</p>
        </footer>
      </div>
    );
  }
  
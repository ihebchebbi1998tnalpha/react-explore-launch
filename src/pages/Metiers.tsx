import { Layout } from "../components/Layout";

const Metiers = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Métiers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* List of different professions */}
          {['Médical', 'Industrie', 'Bâtiment', 'Restauration', 'Sécurité', 'Transport'].map((metier) => (
            <div key={metier} className="relative group overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c" 
                alt={metier} 
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-black/30">
                <span className="absolute top-4 left-4 text-white font-semibold">{metier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Metiers;
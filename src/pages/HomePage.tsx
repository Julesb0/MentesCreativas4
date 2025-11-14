export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Estrella animada */}
        <div className="flex justify-center mb-8">
          <div className="text-6xl animate-bounce">⭐</div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Bienvenido a Colegio Mentes Creativas!
          </h1>
          <p className="text-lg text-slate-300">
            Plataforma educativa con recursos multimedia e interactivos para aprender{" "}
            <span className="text-cyan-400 font-semibold">
              matemáticas, ciencias naturales y tecnología
            </span>
            {" "}de forma lúdica y visual.
          </p>
        </div>
      </div>
    </div>
  );
}

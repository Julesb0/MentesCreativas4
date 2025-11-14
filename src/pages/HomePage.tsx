export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Spinner animado */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"></div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Bienvenido a Mentes Creativas!!
          </h1>
          <p className="text-lg text-slate-300">
            Mentes Creativas te ayuda a mejorar tu entendimiento en{" "}
            <span className="text-cyan-400 font-semibold">
              ciencias, tecnología y matemáticas
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

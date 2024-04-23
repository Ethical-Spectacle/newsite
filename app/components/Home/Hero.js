import AIAnimation from "./animation/AIAnimation";


function Hero() {
  return (
    <main className="w-full flex justify-center">
        <section className="w-full max-w-1440 flex min-h-screen flex-col md:flex-row items-center p-5 py-12 md:p-10 md:space-x-12">
        <header className="flex-1 flex flex-col justify-center space-y-10">
            <div className="space-y-3">
            <h1 className="leading-none text-center text-4xl md:text-5xl md:text-left">Ethical Spectacle<br />Research</h1>
            <h2 className="font-jost font-normal text-2xl text-center md:text-left">A melting pot of ethical leaders and techies that write<br /> 
              <span className="bg-slate-800 text-slate-50 px-2">clean code.</span>
            </h2>
            </div>
        </header>
        <div className="w-full overflow-hidden flex flex-1 justify-center border border-slate-800 box-shadow-style">
            <AIAnimation />
        </div>
        </section>
    </main>
  )
}

export default Hero
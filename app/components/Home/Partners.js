import Button from "../Button";

function Partners() {
  return (
    <main className="w-full flex justify-center">
    <section className="w-full max-w-1440 flex min-h-screen flex-col md:flex-row items-center p-5 md:p-10 md:space-x-12">
    <header className="flex-1 flex flex-col justify-center space-y-10">
        <div className="space-y-3">
        <h1 className="leading-none">Ethical Spectacle<br />Research</h1>
        <h2 className="font-jost font-normal text-2xl md:text-3xl md:font-light">A melting pot of ethical leaders and techies that write clean code.</h2>
        </div>
        <Button 
        title="Join Us"
        />
    </header>
    <div className="w-full overflow-hidden rounded-xl flex flex-1 justify-center border-2 border-slate-800 ">

    </div>
    </section>
</main>
  )
}

export default Partners
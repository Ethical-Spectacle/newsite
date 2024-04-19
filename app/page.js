import Image from "next/image";
import Button from "./components/Button";
import ailadyjustice from "./assets/ailadyjustice.jpeg";

export default function Home() {
  return (
    <main className="w-full flex justify-center">
      <section className="max-w-1440 flex min-h-screen flex-col md:flex-row items-center p-5 md:p-10 md:space-x-12">
        <header className="flex-1 space-y-4">
          <div className="space-y-1">
            <h1 className="leading-none">Ethical Spectacle<br />Research</h1>
            <h2 className="font-jost font-normal">A melting pot of ethical leaders and techies that write clean code.</h2>
          </div>
          <Button 
            title="Join Us"
          />
        </header>

        <div className="w-full overflow-hidden rounded-xl flex flex-1 justify-center border-2">
          <Image
            src={ailadyjustice}
            alt="Ai Lady Justice"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}

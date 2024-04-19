import Button from "../Button";
import Image from "next/image";
import AZVC from "../../assets/AZVC_Transparent.png"
import gcn from "../../assets/global_career_network.png"  

function Partners() {
  return (
    <section className="w-full flex justify-center">
      <section className="w-full max-w-1440 flex min-h-[70vh] flex-col justify-center items-center px-5 py-20 md:p-10 md:space-x-12 space-y-20">
        <div className="cardwrapper h-24 w-[300px] bg-slate-50 rounded-2xl relative overflow-hidden">
          <div className="cardcontent flex items-center justify-center">
            <h1 className="leading-none text-slate-50 text-3xl">Our Partners</h1>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-10 md:flex-row justify-center items-center md:space-x-20">
          <Image src={AZVC} alt="AZVC" width={200} height={200} className="object-contain h-auto max-w-1/2"/>
          <Image src={gcn} alt="Global Career Network" width={300} height={300} className="object-contain h-auto max-w-1/2" />
        </div>
      </section>  
  </section>
  )
}

export default Partners
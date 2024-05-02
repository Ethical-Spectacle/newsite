import Image from "next/image";
import whitelogo from "../assets/whitelogo.svg";
import linkedinplain from "../assets/linkedinplain.svg";
import instagramlogo from "../assets/instagramlogo.svg";
import huggingfacelogo from "../assets/huggingfacelogo.svg";
import meetuplogo from "../assets/meetuplogo.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full">
      <div className="bg-slate-800 grid md:grid-cols-5 p-10 max-md:p-5 gap-5 grid-cols-2 ">
        <div className="p-5 max-md:col-span-2 max-md:justify-self-center">
          <Image
            src={whitelogo}
            alt="Ethical Spectacle Research"
            width={70}
            height={70}
          />
        </div>
        <div className="">
          <h3 className="text-slate-50 text-xl my-2">Learn More</h3>
          <Link href="/">
            <p className="text-sm">Projects</p>
          </Link>
          <Link href="/">
            <p className="text-sm">Workshops</p>
          </Link>
          <Link href="/">
            <p className="text-sm">Upcoming Events</p>
          </Link>
          <Link href="/">
            <p className="text-sm">Opportunities</p>
          </Link>
        </div>
        <div>
          <h3 className="text-slate-50 text-xl my-2">Legals</h3>
          <Link href="/">
            <p className="text-sm">Privacy Policy</p>
          </Link>
          <Link href="/">
            <p className="text-sm">Terms & Conditions</p>
          </Link>
        </div>
        <div className="max-md:col-span-2">
          <h3 className="text-slate-50 text-xl my-2">Contact Us</h3>
          <Link href="/">
            <p className="text-sm">
              President:
              <br /> Maximus Powers
            </p>
          </Link>

          <Link href="/">
            <p className="text-sm">
              Email:
              <br /> maximus@ethicalspectacle.com
            </p>
          </Link>
        </div>
        <div className="p-5 max-md:col-span-2 max-md:justify-self-center max-md:p-2">
          <h3 className="text-slate-50 text-xl my-2 max-md:hidden">Socials</h3>
          <div className="flex gap-5">
            <Link href="/">
              <Image
                src={linkedinplain}
                width={30}
                height={30}
                alt="Linkedin Logo"
                className="text-slate-50"
              ></Image>
            </Link>
            <Link href="/">
              <Image
                src={instagramlogo}
                width={30}
                height={30}
                alt="Instagram Logo"
                className="text-slate-50"
              ></Image>
            </Link>
            <Link href="/">
              <Image
                src={huggingfacelogo}
                width={30}
                height={30}
                alt="Hugging Face Logo"
                className="text-slate-50"
              ></Image>
            </Link>
            <Link href="/">
              <Image
                src={meetuplogo}
                width={30}
                height={30}
                alt="Linkedin Logo"
                className="text-slate-50"
              ></Image>
            </Link>
          </div>
        </div>
      </div>
      <hr className="bg-white w-screen"></hr>
      <div className="flex justify-center items-center bg-slate-800 text-slate-50 py-5">
        <p className="max-md:text-sm">
          © 2024 Ethical Spectacle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

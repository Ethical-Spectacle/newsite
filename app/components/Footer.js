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
      <div className="bg-black grid md:grid-cols-5 p-10 max-md:p-5 gap-5 grid-cols-2 ">
        <div className="p-5 max-md:col-span-2 max-md:justify-self-center">
          <Image
            src={whitelogo}
            alt="Ethical Spectacle Research"
            width={70}
            height={70}
          />
        </div>
        
        <div>
          <h3 className="text-white text-xl my-2">Legals</h3>
          <Link href="/">
            <p className="text-sm text-gray-400">Privacy Policy</p>
          </Link>
          <Link href="/">
            <p className="text-sm text-gray-400">Terms & Conditions</p>
          </Link>
        </div>

        <p className="text-sm text-white max-md:col-span-2">
          maximus@ethicalspectacle.com              
        </p>

        <div className="p-5 max-md:col-span-2 max-md:justify-self-center max-md:p-2">
          <h3 className="text-white text-xl my-2 max-md:hidden">Socials</h3>
          <div className="flex gap-5">
            <Link href="/">
              <Image
                src={linkedinplain}
                width={30}
                height={30}
                alt="Linkedin Logo"
                className="text-gray-400"
              ></Image>
            </Link>
            <Link href="/">
              <Image
                src={instagramlogo}
                width={30}
                height={30}
                alt="Instagram Logo"
                className="text-gray-400"
              ></Image>
            </Link>
            <Link href="/">
              <Image
                src={huggingfacelogo}
                width={30}
                height={30}
                alt="Hugging Face Logo"
                className="text-gray-400"
              ></Image>
            </Link>
            <Link href="/">
              <Image
                src={meetuplogo}
                width={30}
                height={30}
                alt="Linkedin Logo"
                className="text-gray-400"
              ></Image>
            </Link>
          </div>
        </div>
      </div>
      <div className="block text-center items-center bg-black text-gray-400 py-5">
          <p className="max-md:text-sm text-gray-400">
            © 2024 Ethical Spectacle Research.
          </p>
          <p className="max-md:text-sm text-gray-400">
            All rights reserved.
          </p>
        </div>
    </footer>
  );
}

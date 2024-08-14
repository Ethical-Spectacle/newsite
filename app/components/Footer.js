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
      <div className="bg-black grid md:grid-cols-4 max-auto px-20 py-14 max-md:p-5 gap-4 grid-cols-2 ">
        <div className="p-5 max-md:col-span-2 max-md:justify-self-center">
          <Image
            src={whitelogo}
            alt="Ethical Spectacle Research"
            width={70}
            height={70}
          />
        </div>

        <div>
          <h3 className="text-white text-lg my-2">Legals</h3>
          <Link href="/">
            <p className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </p>
          </Link>
          <Link href="/">
            <p className="text-sm text-gray-400 hover:text-white">
              Terms & Conditions
            </p>
          </Link>
        </div>

        <div>
          <h3 className="text-white text-lg my-2">Contacts</h3>
          <p className="text-sm text-gray-400 max-md:col-span-2 hover:text-white">
            maximus@ethicalspectacle.com
          </p>
        </div>

        <div className="p-5 max-md:col-span-2 max-md:justify-self-center max-md:p-2">
          <div className="flex gap-5">
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/ethicalspectacle/about/?viewAsMember=true"
            >
              <Image
                src={linkedinplain}
                width={30}
                height={30}
                alt="Linkedin Logo"
                className=""
              ></Image>
            </Link>
            <Link
              target="_blank"
              href="https://huggingface.co/ethical-spectacle"
            >
              <Image
                src={huggingfacelogo}
                width={30}
                height={30}
                alt="Hugging Face Logo"
              ></Image>
            </Link>
            <Link
              target="_blank"
              href="https://www.meetup.com/ethical-spectacle-research/events/"
            >
              <Image
                src={meetuplogo}
                width={30}
                height={30}
                alt="Meetup Logo"
              ></Image>
            </Link>
          </div>
        </div>
      </div>
      <div className="block text-center items-center bg-black text-gray-400 py-5">
        <p className="max-md:text-sm text-gray-400">
          © 2024 Ethical Spectacle Research.
        </p>
        <p className="max-md:text-sm text-gray-400">All rights reserved.</p>
      </div>
    </footer>
  );
}

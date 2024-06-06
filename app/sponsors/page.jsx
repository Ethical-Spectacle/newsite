import { IoMdArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

export default function Sponsors() {
  return (
    <div className="flex flex-col bg-black min-h-screen justify-center items-center pt-10">
      <h1 className="text-white text-center p-5">Sponsorship Packages 💰</h1>

      <h4 className="text-white text-center">
        Unlock instant access to our special products and perks
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-md:mx-5 mx-16">
        {packages.map((el, index) => (
          <SponsorshipPackage
            key={index}
            name={el.name}
            description={el.description}
            access={el.access}
          />
        ))}
      </div>
    </div>
  );
}

function SponsorshipPackage({ name, description, access }) {
  const accessPoints = access.split(",").map((item, index) => item.trim());

  return (
    <div className="flex flex-col bg-white text-center p-4 relative h-full">
      <div className="bg-black w-full mb-5">
        <h2 className="p-5 text-white">{name}</h2>
      </div>
      <h3 className="mt-15 py-5 text-[22px] text-pink-500">{description}</h3>

      <hr className="bg-black-800 h-1 w-full my-2"></hr>

      <div className="flex flex-col flex-grow">
        <p className="mt-5 text-left text-[18px]">You will have access to:</p>
        <ul className="text-left mt-5 list-disc list-inside">
          {accessPoints.map((point, index) => (
            <li key={index} className="flex items-start text-[16px] py-2">
              <FaCheck className="text-green-500 mr-2 mt-1" />{" "}
              {/* Custom marker */}
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="/"
        className="flex flex-row items-center bg-black p-2 mt-3 justify-center"
      >
        <p className="mr-2 text-white">Learn More</p>
        <IoMdArrowForward className="text-2xl text-white" />
      </a>
    </div>
  );
}

const packages = [
  {
    name: "Titanium 💎",
    description: "$1M+ Donated",
    access:
      "Brand Recognition: Extensive, Logo on all material, Branded hackathon challenges, Recruitment Access: Premium, Access to all resume and profile, Dedicated recruitment booth, Thought leadership and Engagement: Full, Keynote speaking slot, Speaking slot during sessions, Access during the hackathon, Networking opportunities: VIP, VIP networking events, Participant networking sessions, Market intelligence and insights: Comprehensive, Detailed data and insights, Early access to prototypes and solutions, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
  {
    name: "Platinum 🏆",
    description: "$100,000+ Donated",
    access:
      "Brand Recognition: Significant, Logo on all material, Branded hackathon challenges, Recruitment Access: Enhanced, Access to all resume and profile, Dedicated recruitment booth, Thought leadership and Engagement: Major, Speaking slot during sessions, Access during the hackathon, Networking opportunities: High, VIP networking events, Participant networking sessions, Market intelligence and insights, Early access to prototypes and solutions, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
  {
    name: "Gold 🏅",
    description: "$10,000+ Donated",
    access:
      "Brand Recognition: Visible, Logo on all material, Recruitment Access: Standard, Access to all resume and profile, Thought leadership and Engagement: Moderate, Access during the hackathon, Networking opportunities: Standard, Participant networking sessions, Market intelligence and insights, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
  {
    name: "Silver 🪙",
    description: "$1,000+ Donated",
    access:
      "Brand Recognition: Basic, Logo on all material, Recruitment Access: Basic, Access to all resume and profile (Summary Only), Thought leadership and Engagement: Basic,  Networking opportunities: Basic, Participant networking sessions, Market intelligence and insights, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
];

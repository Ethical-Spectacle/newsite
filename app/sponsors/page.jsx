import { IoMdArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

export default function Sponsors() {
  return (
    <div className="flex flex-col bg-black min-h-screen justify-center items-center pt-10">
      <h1 className="text-white text-center p-5">Sponsorship Packages 💰</h1>

      <h4 className="text-white text-center">
        Unlock instant access to our special products and perks
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 mx-10">
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
    <div className="flex flex-col bg-white text-center p-5 relative h-full">
      <div className="bg-black w-full mb-5">
        <h2 className="p-5 text-white">{name}</h2>
      </div>
      <p className="mt-15 flex-grow text-[16px]">{description}</p>

      <hr className="bg-black-800 h-1 w-full my-2"></hr>

      <div>
        <p className="mt-5 text-left text-[18px]">You will have access to:</p>
        <ul className="text-left mt-5 list-disc list-inside">
          {accessPoints.map((point, index) => (
            <li key={index} className="flex items-start text-[16px] py-1">
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
    description: `As a Titanium Sponsor, your brand will enjoy extensive visibility across all event materials,
     including logo placement and branded hackathon challenges. 
     You will have premium recruitment access with all participant resumes and a dedicated booth, 
     along with full thought leadership engagement through a keynote speaking slot and mentorship roles. 
     Networking opportunities will include VIP events, 
     and you'll gain comprehensive insights with early access to prototypes. 
     Your support for ethical Al will be recognized in press releases, social media, and on our website.`,
    access:
      "Brand Recognition: Extensive, Logo on all material, Branded hackathon challenges, Recruitment Access: Premium, Access to all resume and profile, Dedicated recruitment booth, Thought leadership and Engagement: Full, Keynote speaking slot, Speaking slot during sessions, Access during the hackathon, Networking opportunities: VIP, VIP networking events, Participant networking sessions, Market intelligence and insights: Comprehensive, Detailed data and insights, Early access to prototypes and solutions, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
  {
    name: "Platinum 🏆",
    description: `As a Platinum Sponsor, your brand will be significantly highlighted with logo placement on materials and hackathon challenges. 
    You'll receive enhanced recruitment access and a short speaking slot. 
    High-level networking at VIP events. Your support will be acknowledged through press releases, social media, and on our website.`,
    access:
      "Brand Recognition: Significant, Logo on all material, Branded hackathon challenges, Recruitment Access: Enhanced, Access to all resume and profile, Dedicated recruitment booth, Thought leadership and Engagement: Major, Speaking slot during sessions, Access during the hackathon, Networking opportunities: High, VIP networking events, Participant networking sessions, Market intelligence and insights, Early access to prototypes and solutions, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
  {
    name: "Gold 🏅",
    description: `As a Gold Sponsor, you'll receive visible logo placement on hackathon materials, 
    standard recruitment access to participant resumes. Networking opportunities include participant sessions,
    and you'll gain standard access to hackathon insights. 
    Your support for ethical Al will be acknowledged through press releases and social media.`,
    access:
      "Brand Recognition: Visible, Logo on all material, Recruitment Access: Standard, Access to all resume and profile, Thought leadership and Engagement: Moderate, Access during the hackathon, Networking opportunities: Standard, Participant networking sessions, Market intelligence and insights, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
  {
    name: "Silver 🪙",
    description: `As a Silver Sponsor, your brand will be recognized on the hackathon website, 
    with access to a summary of participant profiles and basic engagement roles. 
    You'll have networking opportunities with participants and basic access to hackathon insights. 
    Your sponsorship will be acknowledged on social media and our website.`,
    access:
      "Brand Recognition: Basic, Logo on all material, Recruitment Access: Basic, Access to all resume and profile (Summary Only), Thought leadership and Engagement: Basic,  Networking opportunities: Basic, Participant networking sessions, Market intelligence and insights, Customized sponsorship packages, CSR Impact and Community Engagement",
  },
];

import Image from "next/image";
import whitelogo from "../assets/whitelogo.svg";

function PrivacyPolicy() {
  // Get the current date
  const currentDate = new Date();

  return (
    <div className="bg-black h-[100vh] pt-40 px-10 grid grid-cols-2 max-md:grid-cols-1 gap-2 max-md:pt-10 max-md:px-5">
      <div className="p-5 max-md:col-span-2 max-md:justify-self-center">
        {/* <Image
          src={whitelogo}
          alt="Ethical Spectacle Research"
          width={100}
          height={100}
          className="m-10"
        /> */}
        <h1 className="text-white mb-5 max-md:text-center">Privacy Policy</h1>
        <h4 className="text-white max-md:text-center">Updated on {Date()}</h4>
      </div>
      <div
        className="border-2 border-white p-5 overflow-auto"
        style={{ maxHeight: "80vh" }}
      >
        <PrivacyPolicyText />
      </div>
    </div>
  );
}

export default PrivacyPolicy;

import React from "react";

const PrivacyPolicyText = () => {
  return (
    <div className="text-white">
      <p className="mb-4 text-white">
        At Ethical Spectacle Research, we take your privacy seriously. This
        privacy policy explains what personal data we collect, how we use and
        protect it, and the rights you have concerning your personal
        information.
      </p>

      <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
      <p className="mb-4 text-white">
        We may collect personal information directly from you, such as your
        name, email address, and other contact details when you interact with
        us. We may also collect usage data automatically through technologies
        like cookies when you visit our website.
      </p>

      <h2 className="text-xl font-bold mb-2 text-white">
        How We Use Your Information
      </h2>
      <p className="mb-2 text-white">
        We use the information we collect for legitimate business purposes, such
        as:
      </p>
      <ul className="list-disc pl-5 mb-4 text-white">
        <li>
          <p className="text-white">
            Communicating with you about our research activities and findings
          </p>
        </li>
        <li>
          <p className="text-white">Improving our website and services</p>
        </li>
        <li>
          <p className="text-white">
            Analyzing usage trends to better understand our audience
          </p>
        </li>
        <li>
          <p className="text-white">Complying with legal obligations</p>
        </li>
      </ul>
      <p className="mb-4 text-white">
        We will only process your personal data if we have a lawful basis for
        doing so, such as your consent, contractual necessity, or our legitimate
        interests.
      </p>

      <h2 className="text-xl font-bold mb-2 text-white">
        Data Sharing and Retention
      </h2>
      <p className="mb-4 text-white">
        We do not sell your personal data to third parties. We may share your
        information with trusted service providers who perform services on our
        behalf, under strict confidentiality obligations. We retain your data
        for only as long as necessary for our legitimate business purposes.
      </p>

      <h2 className="text-xl font-bold mb-2 text-white">Data Security</h2>
      <p className="mb-4 text-white">
        We implement reasonable technical, administrative, and physical
        safeguards to protect your personal information from unauthorized
        access, use, or disclosure. However, no method of transmission over the
        internet or data storage is 100% secure.
      </p>

      <h2 className="text-xl font-bold mb-2 text-white">Your Rights</h2>
      <p className="mb-4 text-white">
        You may have certain rights regarding your personal data, such as the
        rights of access, rectification, erasure, restriction of processing,
        data portability, and objection to processing. Contact us to exercise
        these rights.
      </p>

      <h2 className="text-xl font-bold mb-2 text-white">
        Changes to this Policy
      </h2>
      <p className="mb-4 text-white">
        We may update this privacy policy from time to time by posting a new
        version on our website. You should check this page occasionally to
        ensure you agree with any changes.
      </p>

      <h2 className="text-xl font-bold mb-2 text-white">Contact Us</h2>
      <p className="mb-4 text-white">
        If you have any questions about this privacy policy or our data
        practices, please contact us at maximus@ethicalspectacle.com.
      </p>

      <p className="text-white">
        By using our website and services, you consent to the terms of this
        privacy policy.
      </p>
    </div>
  );
};

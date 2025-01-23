import socials from "@/constants/socials";
import Image from "next/image";
import Social from "@/components/ui/social";
import FooterSection from "../ui/footer-section";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between bg-secondary-dark p-12">
      <div className="flex flex-col">
        <Image
          src="/images/logo-transparent.png"
          height={66}
          width={66}
          alt="Logo"
        />
        <div className="mt-4 flex flex-row items-center gap-4">
          {socials.map((social) => (
            <Social
              className="text-lg text-white"
              key={social.name}
              {...social}
            />
          ))}
        </div>
        <span className="mt-20 text-sm font-light text-white">
          © {new Date().getFullYear()} Azharul Jannah, All Rights Reserved
        </span>
      </div>
      <div className="flex flex-row gap-20">
        <FooterSection
          label="Quick Links"
          routes={[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Courses for Women", path: "/" },
            { label: "Courses for Kids", path: "/" },
          ]}
        />
        <FooterSection
          label="More Info"
          routes={[
            { label: "Contact", path: "/contact" },
            { label: "FAQs", path: "/faq" },
            { label: "Terms of Use", path: "/terms-of-use" },
            { label: "Privacy Policy", path: "/privacy-policy" },
          ]}
        />
      </div>
    </footer>
  );
}

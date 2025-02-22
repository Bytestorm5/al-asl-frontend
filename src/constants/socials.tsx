import { Social } from "@/types/social";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

export default [
  {
    name: "WhatsApp",
    url: "https://www.whatsapp.com/channel/0029Vb32vMx6xCSGjYpIvq1B",
    icon: <FaWhatsapp />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/alaslinstitute/",
    icon: <FaInstagram />
  }
] as Social[];

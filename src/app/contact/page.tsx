import { ContactForm } from "@/components/ui/contact-form";
import PrimaryButton from "@/components/ui/primary-button";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-8 py-12">
      <h1 className="mb-8 text-4xl font-bold text-secondary-dark">
        Contact Us
      </h1>
      <p className="mb-8 max-w-2xl text-center text-lg text-secondary">
        You can join our WhatsApp channel below:
      </p>
      <PrimaryButton
        asLink
        className="z-10 rounded-md asl-gradient px-6 py-4 text-sm text-white font-semibold"
        href="https://www.whatsapp.com/channel/0029Vb32vMx6xCSGjYpIvq1B"
      >
          Join WhatsApp
      </PrimaryButton>
    </main>
  );
}

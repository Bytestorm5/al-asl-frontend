import { ContactForm } from "@/components/ui/contact-form";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-8 py-12">
      <h1 className="mb-8 text-4xl font-bold text-secondary-dark">
        Contact Us
      </h1>
      <p className="mb-8 max-w-2xl text-center text-lg text-secondary">
        Have a question or want to get in touch? Fill out the form below, and
        we&apos;ll get back to you as soon as possible.
      </p>
      <ContactForm />
    </main>
  );
}

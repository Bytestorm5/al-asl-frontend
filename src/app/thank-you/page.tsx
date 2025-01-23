import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.session_id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-dark">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Error</h1>
          <p className="mb-8 text-lg text-gray-600">
            Invalid session ID. Please try again.
          </p>

          <Link
            href="/"
            className="w-full rounded-md bg-secondary px-6 py-4 text-sm text-white"
          >
            Back to Home
            <ArrowRight className="ml-2 inline-block h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const session: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id as string);

  if (
    !session.metadata?.registrationId ||
    !session.amount_total ||
    session.payment_status !== "paid"
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-dark">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Error</h1>
          <p className="mb-8 text-lg text-gray-600">
            Invalid session. Please try again.
          </p>

          <Link
            href="/"
            className="w-full rounded-md bg-secondary px-6 py-4 text-sm text-white"
          >
            Back to Home
            <ArrowRight className="ml-2 inline-block h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-dark">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Thank You!</h1>
        <p className="mb-8 text-lg text-gray-600">
          Your payment was successful and your order is confirmed.
        </p>

        <div className="mb-8 rounded-lg bg-gray-50 p-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Order Details
          </h2>
          <p className="mb-2 text-gray-600">
            Order #: {session.metadata!.registrationId as string}
          </p>
          <p className="text-gray-600">Total: ${session.amount_total / 100}</p>
        </div>

        <Link
          href="/"
          className="w-full rounded-md bg-secondary px-6 py-4 text-sm text-white"
        >
          Back to Home
          <ArrowRight className="ml-2 inline-block h-4 w-4" />
        </Link>

        <p className="mt-8 text-sm text-gray-500">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}

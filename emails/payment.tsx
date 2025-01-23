/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Link,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

interface Props {
  paymentMethod: "payNow" | "contactForPayment";
  paymentUrl?: string;
}

export const PaymentEmail = ({
  paymentMethod = "contactForPayment",
  paymentUrl,
}: Props) => {
  const whatsAppUrl = "";

  return (
    <Html>
      <Head />
      <Preview>Complete your registration</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#f7f5f3",
                "primary-dark": "#efebe6",
                secondary: "#964f75",
                "secondary-dark": "#5a334d",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-white font-sans text-base">
          <Img
            src={`${baseUrl}/public/header-banner.png`}
            width="184"
            height="75"
            alt="Azharul Jannah"
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-white">
            <Heading className="my-0 text-center leading-8">
              Complete Your Registration
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Thank you for registering for a class with Azharul
                  Jannah!&nbsp;
                  {paymentMethod === "payNow"
                    ? "To complete your registration, please click the button below to pay now. If you have already paid, please ignore this email."
                    : "To complete your registration, please click the button below to contact us and we will help you arrange a payment method."}
                </Text>
              </Row>
            </Section>

            <Section className="text-center">
              <Link
                href={paymentUrl || whatsAppUrl}
                className="rounded-md bg-secondary px-[18px] py-3 text-white"
              >
                {paymentMethod === "payNow" ? "Complete Payment" : "Contact Us"}
              </Link>
            </Section>
          </Container>

          <Container className="mt-20">
            <Text className="mb-45 text-center text-gray-400">
              From the team at Azharul Jannah
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PaymentEmail;

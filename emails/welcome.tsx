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
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Azharul Jannah</Preview>
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
              Welcome to Azharul Jannah
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Thank you for signing up for Azharul Jannah! We're excited to
                  have you as part of our learning community. We're here to help
                  you get started and answer any questions you have along the
                  way. Welcome to the team! 🎉
                </Text>
              </Row>
            </Section>

            <Section className="text-center">
              <Button className="rounded-md bg-secondary px-[18px] py-3 text-white">
                Click here to join our WhatsApp group
              </Button>
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

export default WelcomeEmail;

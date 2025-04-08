import { BackButton } from "@/components/back-button"
import { Container } from "@/components/ui/container"

export default function PrivacyPage() {
  return (
    <Container size="md" className="py-6 md:py-10">
      <div className="mb-4">
        <BackButton />
      </div>

      <div className="space-y-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: May 1, 2024</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            ShareCab ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use our mobile application, website, and any
            other related services (collectively, the "Services").
          </p>
          <p>
            Please read this Privacy Policy carefully. By using our Services, you consent to the collection, use, and
            disclosure of your information as described in this Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          <p>We may collect several types of information from and about users of our Services, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> This includes information that can be used to identify you, such as
              your name, email address, phone number, postal address, payment information, and government-issued
              identification.
            </li>
            <li>
              <strong>Location Information:</strong> With your consent, we collect precise location information from
              your device to provide our ride-sharing services, including pickup and drop-off locations.
            </li>
            <li>
              <strong>Usage Information:</strong> We collect information about how you use our Services, including your
              ride history, preferences, and interactions with our platform.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about the device you use to access our
              Services, including the hardware model, operating system, unique device identifiers, and mobile network
              information.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our Services</li>
            <li>Process and manage your subscription and ride bookings</li>
            <li>Communicate with you about your account, rides, and our Services</li>
            <li>Personalize your experience and provide content and features relevant to your preferences</li>
            <li>Ensure the safety and security of our Services and users</li>
            <li>Comply with legal obligations and enforce our terms and policies</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Sharing of Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Drivers:</strong> We share your pickup and drop-off locations, name, and phone number with drivers
              to facilitate your rides.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share your information with third-party vendors, consultants,
              and other service providers who need access to such information to carry out work on our behalf.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in
              response to valid requests by public authorities.
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a
              portion of our assets, your information may be transferred as part of that transaction.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please be aware that no method of transmission over the Internet or method of
            electronic storage is 100% secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Your Choices</h2>
          <p>
            You can access, update, or delete your account information at any time through your account settings. You
            may also have certain rights regarding your personal information, depending on applicable law, including the
            right to access, correct, delete, restrict, or object to our use of your personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Children's Privacy</h2>
          <p>
            Our Services are not intended for children under the age of 18. We do not knowingly collect personal
            information from children under 18. If you are a parent or guardian and believe that your child has provided
            us with personal information, please contact us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@sharecab.com.</p>
        </section>
      </div>
    </Container>
  )
}

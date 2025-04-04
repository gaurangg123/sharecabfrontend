import { BackButton } from "@/components/back-button"
import { Container } from "@/components/ui/container"

export default function TermsPage() {
  return (
    <Container size="md" className="py-6 md:py-10">
      <div className="mb-4">
        <BackButton />
      </div>

      <div className="space-y-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: May 1, 2024</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ShareCab's services, including our mobile application, website, and any other
            features, content, or applications offered by ShareCab (collectively, the "Services"), you agree to be bound
            by these Terms of Service. If you do not agree to these terms, please do not use our Services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that
            you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms and
            conditions set forth herein.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Account Registration</h2>
          <p>
            To use certain features of our Services, you must register for an account. You agree to provide accurate,
            current, and complete information during the registration process and to update such information to keep it
            accurate, current, and complete. You are responsible for safeguarding your password and for all activities
            that occur under your account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Subscription Plans</h2>
          <p>
            ShareCab offers various subscription plans for our shared cab service. By subscribing to a plan, you agree
            to pay the applicable fees as described at the time of purchase. Subscription fees are billed in advance and
            are non-refundable except as expressly set forth in these Terms.
          </p>
          <p>
            We reserve the right to modify, terminate, or otherwise amend our offered subscription plans at any time. If
            we make material changes to a subscription plan, we will provide notice to affected subscribers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Cancellation Policy</h2>
          <p>
            Rides can be cancelled according to the cancellation policy applicable to your subscription plan.
            Cancellation fees may apply if you cancel a ride after the specified free cancellation period. Please refer
            to your specific plan details for cancellation terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. User Conduct</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Using the Services for any illegal purpose or in violation of any local, state, national, or international
              law
            </li>
            <li>Harassing, threatening, or intimidating any driver or other user of our Services</li>
            <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting yourself</li>
            <li>Interfering with or disrupting the Services or servers or networks connected to the Services</li>
            <li>
              Damaging, disabling, overburdening, or impairing the Services or interfering with any other party's use
              and enjoyment of the Services
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, ShareCab shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting
            from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your access to or use of or inability to access or use the Services</li>
            <li>Any conduct or content of any third party on the Services</li>
            <li>Any content obtained from the Services</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will
            provide notice to you. Your continued use of the Services after such notice constitutes your acceptance of
            the modified Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of India, without respect to its conflict of laws principles. Any
            dispute arising from or relating to the subject matter of these Terms shall be subject to the exclusive
            jurisdiction of the courts in New Delhi, India.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at support@sharecab.com.</p>
        </section>
      </div>
    </Container>
  )
}


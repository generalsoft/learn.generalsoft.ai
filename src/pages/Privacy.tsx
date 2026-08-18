export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm leading-relaxed">
        <p className="text-base font-semibold text-slate-700">
          Last Updated: August 18, 2026
        </p>

        <p>
          At GeneralSoft Learning Platform (accessible via <a href="https://learn.generalsoft.ai" className="text-primary-600 hover:underline">learn.generalsoft.ai</a>), we respect your privacy and are committed to protecting the personal information you share with us during course registration and communication.
        </p>

        <hr className="border-slate-200" />

        <h2 className="text-xl font-bold text-slate-900 mt-8">1. Personal Data We Collect</h2>
        <p>When you register for a course or contact us, we collect the following information:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Required:</strong> First name, Last name, and Email address.</li>
          <li><strong>Registration Type Details:</strong> For individuals, we record the registration type. For companies, we additionally collect Company Name and Job Title / Role.</li>
          <li><strong>Optional details:</strong> Phone number, Country, and how you heard about the platform.</li>
          <li><strong>System metadata:</strong> Secure cryptographic hashes of verification tokens, registration status, date/time stamps, and confirmation dates.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-8">2. Why We Collect Data & How It Is Used</h2>
        <p>Your registration data is used solely to facilitate the educational services you register for, including:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Sending security validation tokens to verify your email.</li>
          <li>Confirming your attendance and sending joining links (such as Zoom/Teams invites).</li>
          <li>Invoicing and billing tracking for company registrations.</li>
          <li>Sending essential course updates, schedules, and materials.</li>
          <li>Optional newsletter updates (only if you check the communications agreement box).</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-8">3. Email Verification Flow</h2>
        <p>
          To maintain security and prevent spam bookings, we require email validation. Upon registering, a secure, time-limited token is generated in our database. When you click the verification link in your inbox, this token confirms your seat. Raw verification tokens are not stored inside our databases; we store cryptographically secure SHA-256 hashes instead.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">4. Data Retention</h2>
        <p>
          We retain registration details for as long as is necessary to manage course logistics, address invoicing, and maintain historical attendance records. If a registration remains unverified (pending status) for more than 7 days, it may be automatically purged from our databases.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">5. Third-Party Services</h2>
        <p>
          We do not sell, rent, or trade your personal information. We utilize reputable cloud and serverless providers (including Amazon Web Services and Google Cloud Platform) to host our database servers and dispatch transactional emails (such as Amazon SES). These providers have access to your data only to execute service requests on our behalf.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">6. Correction, Deletion & User Rights</h2>
        <p>
          You have the right to request access to the personal data we hold about you, request corrections to incorrect data, or request complete deletion of your records. To do so, please contact us at <a href="mailto:info@generalsoft.ai" className="text-primary-600 hover:underline">info@generalsoft.ai</a>, and we will address your request within 5 business days.
        </p>
      </div>
    </div>
  );
}

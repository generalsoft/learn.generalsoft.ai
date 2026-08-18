export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm leading-relaxed">
        <p className="text-base font-semibold text-slate-700">
          Last Updated: August 18, 2026
        </p>

        <p>
          By registering for any training course, workshop, or educational program offered by Generalsoft Learning Platform (<a href="https://learn.generalsoft.ai" className="text-primary-600 hover:underline">learn.generalsoft.ai</a>), you agree to comply with and be bound by the following terms and conditions.
        </p>

        <hr className="border-slate-200" />

        <h2 className="text-xl font-bold text-slate-900 mt-8">1. Registration and Eligibility</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Verification:</strong> Registration is only final once your email address has been successfully verified via the verification link sent to your inbox. Unverified seats may be released at any time.</li>
          <li><strong>Individual Seats:</strong> Individual seats are provided free of charge for personal educational enrichment and are non-transferable.</li>
          <li><strong>Corporate Seats:</strong> Corporate bookings require listing company details. An fee of AED 400 per attendee applies. Payment instructions and invoices will be issued to the registered corporate email.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-8">2. Course Format & Code of Conduct</h2>
        <p>
          Courses are conducted live online (unless specified otherwise) using streaming platforms (such as Zoom or Teams). Participants are expected to behave professionally. We reserve the right to remove any participant from a live session who engages in disruptive, harassing, or inappropriate behavior.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">3. Invoicing and Payments</h2>
        <p>
          For corporate registrations, Generalsoft will issue an invoice for the total expected amount (based on the price of AED 400 per registered attendee) to the company details supplied. Payment must be cleared prior to the course date to guarantee connection instructions. All prices are in UAE Dirhams (AED) and exclude VAT unless specified otherwise.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">4. Intellectual Property</h2>
        <p>
          All course materials, worksheets, slide decks, diagrams, video recordings, and templates provided during the course are the intellectual property of Generalsoft. You are granted a personal, non-exclusive license to use these assets for your own professional development. You may not distribute, resell, upload, or publicly share course materials without our express written consent.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">5. Cancellations & Postponement</h2>
        <p>
          We strive to deliver courses as scheduled. However, Generalsoft reserves the right to postpone or cancel a cohort due to unforeseen operational conflicts or emergency circumstances. In the event of postponement, registered attendees will be automatically transferred to the new dates, or they can request a cancellation of their ticket.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8">6. Limitation of Liability</h2>
        <p>
          Generalsoft provides technology training for informational purposes. While we outline best practices and security frameworks, Generalsoft is not liable for how you deploy or configure software, AI tools, or code inside your own organization. You assume all responsibility for verifying LLM outputs and respecting data privacy rules.
        </p>
      </div>
    </div>
  );
}

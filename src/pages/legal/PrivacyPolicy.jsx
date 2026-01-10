import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 section-padding-x font-poppins dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 dark:text-white">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              1. Introduction
            </h2>
            <p>
              Welcome to EDIZ IT Institute. We are committed to protecting your
              personal information and your right to privacy. If you have any
              questions or concerns about our policy, or our practices with
              regards to your personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              2. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when registering at the EDIZ IT Institute, expressing an interest
              in obtaining information about us or our products and services,
              when participating in activities on the Website or otherwise
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              3. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our Website for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              4. Sharing Your Information
            </h2>
            <p>
              We only share information with your consent, to comply with laws,
              to provide you with services, to protect your rights, or to
              fulfill business obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              5. Contact Us
            </h2>
            <p>
              If you have questions or comments about this policy, you may email
              us at info@edizit.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

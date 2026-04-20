import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 section-padding-x font-poppins transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 dark:text-white">
          Terms and Conditions
        </h1>

        <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing our Website, you agree to be bound by these Terms and
              Conditions and to comply with all applicable laws and regulations.
              If you do not agree with any of these terms, you are prohibited
              from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise stated, EDIZ IT Institute and/or its licensors
              own the intellectual property rights for all material on the
              Website. All intellectual property rights are reserved. You may
              access this from the Website for your own personal use subjected
              to restrictions set in these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              3. User Obligations
            </h2>
            <p>
              As a user of our Website, you agree to use the site only for
              lawful purposes and in a way that does not infringe the rights of,
              restrict or inhibit anyone else's use and enjoyment of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              4. Limitations of Liability
            </h2>
            <p>
              In no event shall EDIZ IT Institute be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on our Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-100">
              5. Modifications
            </h2>
            <p>
              EDIZ IT Institute may revise these terms of service for its
              website at any time without notice. By using this website you are
              agreeing to be bound by the then current version of these terms of
              service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

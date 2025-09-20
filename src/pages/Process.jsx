import React from 'react'

const Process = () => {
  return (
   <section className="py-16 px-6 sm:px-10 bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          How It Works
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Our AI-powered Kidney Stone Detection platform makes early diagnosis simple and accurate. Here’s how the process works for patients and doctors.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-indigo-200 transition">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 mb-4 text-indigo-600 font-bold text-xl">
            1
          </div>
          <h2 className="font-semibold text-lg text-gray-900 mb-2">Upload X-ray Scan</h2>
          <p className="text-gray-600 text-sm">
            Patients or clinics upload kidney X-ray images to the platform securely.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-indigo-200 transition">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 mb-4 text-indigo-600 font-bold text-xl">
            2
          </div>
          <h2 className="font-semibold text-lg text-gray-900 mb-2">AI Analysis</h2>
          <p className="text-gray-600 text-sm">
            Our AI system analyzes the scan and detects kidney stones with high accuracy.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-indigo-200 transition">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 mb-4 text-indigo-600 font-bold text-xl">
            3
          </div>
          <h2 className="font-semibold text-lg text-gray-900 mb-2">Receive Report</h2>
          <p className="text-gray-600 text-sm">
            Doctors and patients receive a detailed report highlighting detected stones and suggested next steps.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <button
          onClick={() => window.location.href = "/detection"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition flex items-center gap-2 mx-auto"
        >
          <span>Start Detection Now</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Process
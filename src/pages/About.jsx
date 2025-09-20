import React from 'react';

const About = () => {
  return (
    <>
      {/* About Section */}
      <section className="bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] py-12 px-6 sm:px-12 lg:px-24 max-w-full mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          About Our Solution
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
          We provide an advanced AI-powered Kidney Stone Detection platform that offers precise and fast analysis of X-ray scans to aid early diagnosis and improve patient outcomes.
        </p>
      

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 max-w-7xl mx-auto py-16 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF]">

        {/* Image Section */}
        <div className="relative rounded-2xl overflow-hidden shrink-0 max-w-md w-full shadow-2xl shadow-indigo-600/20">
          <img
            className="w-full object-cover rounded-2xl"
            src="https://imgs.search.brave.com/qbLBSlBVekbCG_dCPXRYNmR8IrB8krGg6EUeZErNckE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kb21m/NW9pbzZxcmNyLmNs/b3VkZnJvbnQubmV0/L21lZGlhbGlicmFy/eS8xNjc4Ny9jb252/ZXJzaW9ucy9wMy1r/aWRuZXlzLXdsMDcy/NS1naTEzMzQ4MjM0/NjYtdGh1bWIuanBn"
            alt="Kidney X-ray AI Detection"
          />
        </div>

        {/* Text Section */}
        <div className="text-sm text-slate-700 max-w-lg">
          <h1 className="text-3xl sm:text-4xl uppercase font-bold text-slate-900 leading-tight">
            What we do?
          </h1>
          <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF] mt-2"></div>

          <p className="mt-8">
            Our Kidney Stone Detection platform uses advanced AI to analyze X-ray scans and detect kidney stones quickly and accurately.
          </p>
          <p className="mt-4">
            Patients and doctors can rely on our solution for early diagnosis, ensuring timely treatment and better outcomes.
          </p>
          <p className="mt-4">
            With a user-friendly interface and detailed AI reports, our system empowers healthcare professionals to make informed decisions.
          </p>
          <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white text-lg font-medium">
            <span>Start Detection</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </section>

      
      </section>
    </>
  );
}

export default About;

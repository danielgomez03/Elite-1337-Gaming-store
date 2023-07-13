import React from "react";

const Tech = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Tech Stack</h1>
        <h2 className="text-2xl font-bold mb-2">Front-end:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Next.js</li>
          <li>React</li>
          <li>React Redux</li>
          <li>Tailwind CSS</li>
          <li>PostCSS</li>
          <li>Axios</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Back-end:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Node.js</li>
          <li>Express</li>
          <li>Sequelize</li>
          <li>PostgreSQL</li>
          <li>Passport</li>
          <li>JSON Web Token</li>
          <li>Bcrypt</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Other Technologies:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Google Analytics</li>
          <li>Socket.io</li>
          <li>NodeMailer</li>
          <li>Cloudinary</li>
          <li>Multer</li>
          <li>Stripe</li>
        </ul>
      </div>
    </div>
  );
};

export default Tech;

import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-gray-200 py-4 px-6 mt-auto h-120">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center">
        <ul className="grid grid-cols-2 gap-x-10 gap-y-4">
          <li><Link href="/questionsAnswers">Questions && Answers</Link></li>
          <li><Link href="/termsConditions">Terms && Conditions</Link></li>
          <li><Link href="/paymentMethods">Payment Methods</Link></li>
          <li><Link href="/undo">Undo</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/chat">I want to ask a question</Link></li>
          <li><Link href="/contact">I want to be called</Link></li>
          <li><a href="www.facebook.com"><img src="" alt="" /></a></li>
          <li><a href="www.twitter.com"><img src="" alt="" /></a></li>
          <li><a href="www.youtube.com"><img src="" alt="" /></a></li>
          <li><a href="www.instagram.com"><img src="" alt="" /></a></li>
        </ul>
      </div>
      <p className="text-center mt-4">Copyright &copy; 2023 StratEdge Technologies</p>
    </div>
  );
};

export default Footer;

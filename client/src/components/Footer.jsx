import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
        <ul>
          <li><Link href="/questionsAnswers" >Questions && Answers</Link></li>
          <li><Link href="/termsConditions" >Terms && Conditions</Link></li>
          <li><Link href="/paymentMethods" >Payment Methods</Link></li>
          <li><Link href="/undo" >Undo</Link></li>
          <li><Link href="/about" >About Us</Link></li>
          <li><Link href="/contact" >Contact</Link></li>
          <li><Link href="/chat" >I want to ask a question</Link></li>
          <li><Link href="/contact" >I want to be called</Link></li>
          <li><a href='www.facebook.com' ><img src="" alt="" /></a></li>
          <li><a href='www.twitter.com' ><img src="" alt="" /></a></li>
          <li><a href='www.youtube.com' ><img src="" alt="" /></a></li>
          <li><a href='www.instagram.com' ><img src="" alt="" /></a></li>
        </ul>
      <p>Copyright &copy; 2023 StratEdge Technologies</p>
    </div>
  )
}

export default Footer;
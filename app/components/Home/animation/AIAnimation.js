'use client';
import aiAnimation from './aiAnimation.json';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

function AIAnimation() {
  return (
    <Lottie animationData={aiAnimation} style={{ width: '100%', height: '100%' }} />
  )
}

export default AIAnimation
import { useEffect, useState } from 'react';
import mountainHero from '@/assets/mountain-hero.jpg'; // adjust path if needed

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-75"
        style={{
          backgroundImage: `url(${mountainHero})`,
          transform: `translate3d(0, ${Math.min(offsetY * 0.4, 60)}px, 0)`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white" />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-blue-900 mb-2">Mohamed Amr</h1>
          <h2 className="text-2xl font-semibold text-black mb-4">Machine learning</h2>
          <p className="text-gray-100 text-md max-w-xl mx-auto mb-6">
            Transforming complex data into breakthrough insights through cutting-edge machine learning and AI innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow">
              View Portfolio
            </button>
            <button className="bg-black

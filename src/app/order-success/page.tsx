"use client";
import React from "react";
import Link from "next/link";
// CheckCircle import yahan se delete kar di gayi hai

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-white">
      <div className="bg-green-100 p-8 rounded-full mb-6 animate-bounce">
        <span className="text-7xl">✅</span>
      </div>
      <h1 className="text-4xl font-black text-gray-800 mb-4 italic uppercase tracking-tighter">Order Confirmed!</h1>
      <p className="text-gray-500 max-w-sm mb-10">Shukriya! Aapka order Massimo kitchen mein pounch chuka hai.</p>
      
      <Link href="/">
        <button className="bg-red-500 text-white px-10 py-4 rounded-full font-black hover:bg-black transition-all shadow-xl uppercase tracking-widest">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
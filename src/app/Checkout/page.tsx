"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Image wapis add kar di
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart(); 
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form States (Name aur Email dono ke liye)
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  
  const router = useRouter();

  useEffect(() => setIsHydrated(true), []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = (subtotal + 2.0 + (subtotal > 50 ? 0 : 5.0)).toFixed(2);

  const handleConfirmOrder = async () => {
    // Validation: Name aur Email dono check honge
    if (!customerName || !customerEmail) {
      alert("Please fill in both Name and Email!");
      return;
    }

    setLoading(true);
    const orderData = {
      customer: customerName,
      email: customerEmail, // Email API ko bheja ja raha hai
      products: cartItems.map(i => `${i.title} (x${i.quantity})`).join(", "),
      price: total,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        if (clearCart) clearCart();
        router.push("/order-success"); 
      }
    } catch {
      alert("API Error!");
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) return <div className="p-20 text-center">Loading Massimo...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-red-500 uppercase italic">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- Left Side: Form & Items --- */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-bold text-sm">Full Name</label>
              <input 
                type="text" placeholder="Enter Name" 
                className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-sm">Email Address</label>
              <input 
                type="email" placeholder="Enter Email" 
                className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold border-b pb-2 text-gray-700">Review Items</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm border">
                <div className="relative w-16 h-16 shrink-0">
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm uppercase">{item.title}</h3>
                  <p className="text-xs text-gray-500 italic">Qty: {item.quantity}</p>
                </div>
                <div className="font-bold text-red-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Right Side: Summary & Payment --- */}
        <div className="h-fit sticky top-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg border-t-4 border-red-500">
            <h2 className="text-xl font-bold mb-4 italic">Order Summary</h2>
            <div className="space-y-2 mb-6 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 border-b pb-2 font-mono">
                <span>Delivery/Service:</span>
                <span>$2.00 + fee</span>
              </div>
              <div className="flex justify-between text-2xl font-black mt-4 text-red-600">
                <span>TOTAL:</span>
                <span>${total}</span>
              </div>
            </div>
            
            <button 
              onClick={handleConfirmOrder}
              disabled={loading}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-black hover:bg-black transition-all disabled:bg-gray-400 uppercase tracking-widest shadow-md"
            >
              {loading ? "SAVING..." : "CONFIRM ORDER"}
            </button>
            <p className="text-[10px] text-center mt-4 text-gray-400 uppercase">Secure Payment by Massimo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
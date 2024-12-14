import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const whatsappNumber = 1234567891; // Replace with your WhatsApp number
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 flex items-center bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 "
      aria-label="WhatsApp Contact"
    >
      <FaWhatsapp size={24} />
      {isHovered && (
        <span className="ml-2 font-semibold transition-all duration-200">
          Chat with us!
        </span>
      )}
    </a>
  );
};

export default WhatsAppButton;

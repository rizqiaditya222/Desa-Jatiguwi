import React from "react";

const PetaDesa = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="relative aspect-video w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-[#0E4D45]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31594.899707700668!2d112.46549481753576!3d-8.166188998581099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78988501e35369%3A0xf0013929e0d81bf2!2sJatiguwi%2C%20Kec.%20Sumberpucung%2C%20Kabupaten%20Malang%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1753809132618!5m2!1sid!2sid"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default PetaDesa;

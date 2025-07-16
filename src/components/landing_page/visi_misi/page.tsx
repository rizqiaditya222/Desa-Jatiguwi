import React from 'react';

const VisiMisi = () => {
  const kataKata = [
    { id: 1, text: 'Kreatif' },
    { id: 2, text: 'Agamis' },
    { id: 3, text: 'Responsif' },
    { id: 4, text: 'Tertib' },
    { id: 5, text: 'Inspiratif' },
    { id: 6, text: 'Ngayomi' },
    { id: 7, text: 'Inovatif' },
  ];

  return (
    <div className='flex flex-col px-24 bg-[#0E4D45] justify-center items-center pb-24'>
      <div className='w-full flex justify-between '>
        <p className='font-bold text-[#fafafa] text-4xl'>
          Profil Desa Jatiguwi
        </p>
        <p className='w-2/5 text-end text-[#fafafa]'>
          Mengenal lebih dekat Desa Jatiguwi dengan sejarah, visi, dan misi dalam berkomitmen untuk melayani masyarakat dengan baik.
        </p>
      </div>
      <div className='my-5 w-full h-[1px] bg-[#fafafa] my-3'></div>
      <div className='flex flex-col text-[#fafafa] items-center'>
        <p className='text-3xl font-semibold pt-12 pb-8'>
          Visi & Misi
        </p>
        <p className='text-2xl pb-8'>
          Terwujudnya masyarakat Desa Jatiguwi yang: <span className='font-bold'>KARTINI</span>
        </p>
      </div>

      <div className=" grid grid-cols-3 gap-6 bg-[#0E4D45] text-[#fafafa]"> 
        {kataKata.map((kata) => (
          <div key={kata.id} className="text-lg"> 
            {kata.id}. {kata.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisiMisi;
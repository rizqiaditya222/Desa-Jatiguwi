import React from 'react'

const perangkatDesaImages = Array(6).fill("img/perangkat_desa/kades.png");

const PerangkatDesa = () => {
  return (
    <div className='flex flex-col items-center py-24 text-[#0E4D45]'>
        <div className='flex flex-col items-center'>
            <p className='text-4xl font-bold pb-12'>Perangkat Desa</p>
        <div className='rounded-4xl'>
        <img className='w-full' src="img/perangkat_desa.png" alt="" />
        </div>
        </div>
        <div className='flex flex-col pt-12 items-center'>
            <img className='w-96 py-12' src="img/perangkat_desa/kades.png" alt="" />
                    <div className='grid grid-cols-3 gap-6 rounded-4xl'> {/* Menggunakan grid dengan 3 kolom dan jarak 4 */}
          {perangkatDesaImages.map((src, index) => (
            <img 
              key={index} 
              className='w-96' 
              src={src} 
              alt={`Perangkat Desa ${index + 1}`} 
            />
          ))}
        </div>
        </div>
    </div>
  )
}

export default PerangkatDesa

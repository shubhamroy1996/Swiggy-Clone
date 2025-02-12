import React from 'react'

function Shimmer() {
  return (
    <div className='w-full'>
        <div className='w-full h-[350px]  text-white flex justify-center items-center flex-col bg-slate-900'>
            <div className='relative flex items-start'>
            <img 
                className='w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'
            src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa' alt=''/>
            <span className='loader'></span>
            </div>
            
            <h1 className='text-2xl'>Looking for great food near you...</h1>
        </div>

        <div className="w-[125%] md:w-[86%] mx-auto py-6 flex flex-wrap overflow-hidden gap-6">
                {Array(12)
                    .fill("")
                    .map((data , i) => (
                        <div key={i} className="w-[295px] animate h-[182px]  rounded-md"></div>
                    ))}
            </div>  
      
    </div>
  )
}

export default Shimmer

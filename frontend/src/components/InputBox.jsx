import React,{useId} from 'react'

function InputBox(
   {
    type="text",
    className="",
    ...props

   }
) {
    const id = useId();
  return (
    <div className={`w-full  flex items-center ${className}`}>
        <input 
        type={type}
        className={`w-full text-sm bg-white border-[1.5px] px-5 py-3 rounded mb-4 outline-none mx-auto cursor-pointer  `}
        id={id}
        {...props}
         />
      
    </div>
  )
}

export default InputBox

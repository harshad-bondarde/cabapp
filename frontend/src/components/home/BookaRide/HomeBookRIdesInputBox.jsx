export function BookRIdesInputBox({label,placeholder,OnChange}){

    return (
        
        <div>
            <div className="text-xs mx-2 my-1 font-semibold">
                {label} :
            </div>

            {placeholder?
                <input type="text" onChange={OnChange} placeholder={placeholder} className="border-2 shadow-md rounded-2xl p-2 transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer  h-14 w-56 "/>
                :
                <input type="text" onChange={OnChange} placeholder={label} className="border-2 shadow-md rounded-2xl p-2 transition ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer  h-14 w-56"/>
            }
            
        </div>
    )
}
export function InputBox({label,placeholder,OnChange}){

    return (
        
        <div>
            <div className="text-sm mx-2 ml-5 my-1 font-semibold">
                {label} :
            </div>

            {placeholder?
                <input type="text" onChange={OnChange} placeholder={placeholder} className="border-2 ml-3  rounded-2xl p-2 transition ease-in-out duration-150 hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:border-green-300 "/>
                :
                <input type={label=='Password' ? 'password': 'text'} onChange={OnChange} placeholder={label} className="border-2 ml-3  rounded-2xl p-2 transition ease-in-out duration-150 hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:border-green-300 w-80 "/>
                }
        </div>
    )
}
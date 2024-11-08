export function AddRideInputBox({label,placeholder,OnChange}){
    return (
        
        <div className="mb-2">
            <div className="text-sm mb-1 mx-2">
                {label}
            </div>
            {placeholder?
                <input  type="text" placeholder={placeholder} onChange={OnChange} 
                    className=" p-4 border-2 border-slate-300 rounded-lg shadow-lg hover:shadow-green-500 transition ease-in-out duration 300ms hover:-translate-y-1 h-12 w-72"/>
                    :
                <input  type="text" placeholder={label} onChange={OnChange} 
                    className=" p-4 border-2 border-slate-300 rounded-lg shadow-lg hover:shadow-green-500 transition ease-in-out duration 300ms hover:-translate-y-1 h-12 w-72"/>
            }    
            </div>
    )
}
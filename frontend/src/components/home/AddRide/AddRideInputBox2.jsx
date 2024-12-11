export function AddRideInputBox2({label,value,placeholder,OnChange}){
    return (
        
        <div className="mb-2 font-medium">
            <div className="text-sm mb-1 mx-2">
                {label}
            </div>    
            
            <input  type="text" value={value} placeholder={placeholder ? placeholder : label} onChange={OnChange} 
                className=" p-4 border-2 border-slate-300 rounded-lg shadow-lg hover:shadow-blue-300 transition ease-in-out duration 300ms hover:-translate-y-1 h-12 w-full"/>
            </div>
    )
}
export function Button({label,OnClick}){
    return (
            <button onClick={OnClick} className=" transition ease-in-out hover:border-green-600 w-full p-2 flex flex-col items-center border mt-3 rounded-3xl font-semibold text-white bg-green-500">
                {label}
            </button>
    )
}


export function NavButton({ label, renderNumber, setRenderButton, sign }) {
    return (
        <div onClick={() => {
            setRenderButton(renderNumber)
        }} className="text-center text-gray-500 font-medium p-3 m-2 shadow-xl rounded-lg hover:shadow-blue-300 transition ease-in-out duration-200 cursor-pointer">
            {label}
        </div>
    )
}
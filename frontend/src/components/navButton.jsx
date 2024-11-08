

export function NavButton({ label, renderNumber, setRenderButton, sign }) {
    return (
        <div onClick={() => {
            setRenderButton(renderNumber)
        }} className="text-center  p-3 m-2 shadow-xl rounded-lg hover:shadow-green-400 transition ease-in-out duration-200 cursor-pointer">
            {label}
        </div>
    )
}
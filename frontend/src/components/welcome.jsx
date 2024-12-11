export function Welcome(){
    return (
        <div className="flex flex-col items-center border-8 text-center rounded-xl shadow-xl border-blue-200">
            <div className="bg-blue-200 w-full">
                <h1 className="text-4xl mt-1 shadow-lg mx-24 rounded-xl font-medium text-blue-500 leading-tight ">Welcome to CabApp </h1>
                <h1 className="m-4 font-thin">Book and Add Your Rides Instantly...</h1>
            </div>
            <div className="flex space-x-20 mt-9 text-sm  p-5">
                <div className="border-4 p-3 rounded-xl border-blue-200 transition ease-in-out hover:border-blue-400 hover:-translate-y-1">
                    As a Captain you can provide rides to Users 
                </div>  
                <div className="border-4 p-3 rounded-xl border-blue-200 transition ease-in-out hover:border-blue-400 hover:-translate-y-1">
                    As a User you can book your ride instantly
                </div>              
            </div>                
        </div>
    )
}
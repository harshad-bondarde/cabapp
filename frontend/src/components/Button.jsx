import {LoadingBlue} from "./Loading"

export function Button({label , OnClick , loading}){
    return (
            <div onClick={OnClick} className="cursor-pointer transition ease-in-out hover:border-green-600 w-full p-2 flex flex-col items-center border mt-3 rounded-3xl font-semibold text-white bg-green-500">
                { 
                    !loading ?

                        label
                    
                    :
                        <div className="w-6 h-6 text-green-600">
                            <LoadingBlue/>
                        </div>
                }
            </div>
    )
}
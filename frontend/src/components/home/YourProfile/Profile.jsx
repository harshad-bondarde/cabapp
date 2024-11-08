import { Star } from 'lucide-react';
export function Profile({userInfo}){

    function capitaliser(name){
        let ans=""
        for(let i=0;i<name.length;i++){
            if(i==0){
                ans+=name[i].toUpperCase()
            }else[
                ans+=name[i]
            ]
        }
        return ans;
    }

    function Text({label}){
        return (
            <>
                <div className="">
                    {label}
                </div>
            </>
        )
    }
    
    return (
        <>
            <div className="flex flex-col justify-center items-center mt-5">
                <div className="border-4 p-5 m-3 w-fit h-fit bg-gray-300 border-gray-300 rounded-2xl shadow-xl ">    
                    
                    <div className="flex space-x-8">
                        <div className="flex flex-col space-y-7">

                            <div className="">
                                    Firstname : {userInfo.firstname?<>{capitaliser(userInfo?.firstname)}</>:null}
                            </div>

                            <div className="">
                                    Gender : {userInfo.gender?<>{capitaliser(userInfo?.gender)}</>:null}
                            </div>

                            <div className="">
                                    Email : {userInfo.email?<>{capitaliser(userInfo?.email)}</>:null}
                            </div>
                        
                        </div>

                        <div className="flex flex-col space-y-7">
                            <div>
                                    Lastname:   {userInfo.lastname?<>{capitaliser(userInfo?.lastname)} </>:null}
                            </div>
                    
                            <div>
                                    Rides Published:   {<>{userInfo?.numberofrides} </>}
                            </div>
                        
                            <div>
                                    PhoneNo : {<>{userInfo?.phoneno} </>}
                            </div>
                            
                        </div>  
                    </div>

                    <div className="w-full flex flex-col space-y-5 justify-center mt-5 items-center">
                        <div className='flex   font-semibold items-center'>
                            Overall Rating : {userInfo.ratingsgiven>0 ? userInfo.ratings/userInfo.ratingsgiven : "0"}/5 <Star size={20}/>
                        </div>

                        <div className='border-2 bg-blue-500 p-2 cursor-pointer rounded-xl border-blue-500 text-white shadow-md'>
                            Update
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
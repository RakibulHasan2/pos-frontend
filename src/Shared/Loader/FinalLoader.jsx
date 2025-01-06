// import { LuLoader } from "react-icons/lu";



const FinalLoader = () => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm  ml-64">
            <div className=" flex flex-col items-center text-red">
            {/* <LuLoader  className="text-8xl text-[#917d3e] animate-spin" /> */}
                <span className="loader"></span>

                <p className="  md:top-[-80px] text-2xl mt-5">
                    Loading...
                    <span className="loading-dots">
                        <span className="dot-1">.</span>
                        <span className="dot-2">.</span>
                        <span className="dot-3">.</span>
                    </span>
                </p>
                
            </div>
        </div>
    );
};

export default FinalLoader;
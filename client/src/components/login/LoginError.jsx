import React, { useState, useEffect} from "react";

export default function LoginError({ message, errorDisp}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true)
        const timer = setTimeout(() =>{
            setIsVisible(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [errorDisp]);

  return (
    <>
      <div className={`flex justify-center ${!isVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <div className="flex justify-center h-6 w-full mt-4 rounded bg-red-600">
          <p className="text-white">&#x1F6C8; {message}</p>
        </div>
      </div>
    </>
  );
}

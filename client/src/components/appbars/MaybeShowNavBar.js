import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MaybeShowNavBar({children}){
    const location = useLocation();
    const [showNavBar, setShowNavBar] = useState(false);

    useEffect(()=>{
        console.log("this is location: ", location);
        if(location.pathname==='/map-edit')
            setShowNavBar(false);
        else{
            setShowNavBar(true);
        }
    },[location])

    return (
        <div>{showNavBar && children}</div>
    )
}

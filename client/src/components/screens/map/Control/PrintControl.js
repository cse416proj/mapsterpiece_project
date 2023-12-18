import { useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet-easyprint';
import { useMap } from 'react-leaflet';

export default function PrintControl(prop) {
    // get map instance
    const map = useMap();

    useEffect(() => {
        // add print control when map component mounts
        const printControl = L.easyPrint({...prop});

        map.addControl(printControl);

        // remove when unmounted
        return () => {
            map.removeControl(printControl);
        }
    }, [map]);

    return null;
}
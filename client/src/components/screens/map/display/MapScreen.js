import { useContext } from 'react';
import { Box } from '@mui/material';
// import html2canvas from 'html2canvas';

// import MapContext from './MapContext';
import GeojsonMap from './GeojsonMap';
// import KmlMap from './KmlMap';

import MapContext from '../../../../contexts/map';

function MapScreen(){
    const { mapInfo } = useContext(MapContext);
    const content = mapInfo.fakeFileContent;

    // useEffect(() => {
    //     // console.log('urmom');

    //     // fetch('./HKG_adm.zip')
    //     // .then(response => response.json())
    //     // .then(fileContent => {
    //     //     console.log('File content:', fileContent);
    //     // })
    //     // .catch(error => {
    //     //     console.error('Error fetching file:', error);
    //     // });

    //     // mapInfo.setTitle('map');
    
    //     // // set fileFormat(shp/geojson/kml) for mapInfo
    //     // mapInfo.setFileFormat("GeoJSON");
    
    //     // // set tags for mapInfo
    //     // mapInfo.setTags(["GeoJSON"]);

    //     // mapInfo.processFile(files);

    //     // mapInfo.createMap();
    // }, []);

    if(!mapInfo){
        return null;
    }

    return(
        <Box id='map-viewer'>
            <GeojsonMap map={content}/>
            {/* {
                (content) ?
                    (
                        (mapInfo.fileFormat === 'Keyhole(KML)') ?
                        <KmlMap map={content}/>
                        : <GeojsonMap map={content}/>
                    )
                    : null
            } */}
        </Box>
    );
}

export default MapScreen;
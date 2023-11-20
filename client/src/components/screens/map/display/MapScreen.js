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
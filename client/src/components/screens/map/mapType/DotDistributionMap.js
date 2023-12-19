import { CircleMarker } from "react-leaflet";

export default function DotDistributionMap({dataMapKey, data, color}){
    if(!data){
        return null;
    }

    return (
        <div key={dataMapKey}>
            {data.map((prop, index) => {
                return (
                    <div key={index}>
                        {prop.randomDotsForRegion.map((dot, index) => {
                            return (
                                <CircleMarker
                                    key={`dot-${index}`}
                                    center={[dot.geometry.coordinates[1], dot.geometry.coordinates[0]]}
                                    radius={3}
                                    fillOpacity={1}
                                    stroke={false}
                                    eventHandlers={{
                                        mouseover: (e) => {
                                            const layer = e.sourceTarget;
                                            layer.bringToBack();
                                        },
                                    }}
                                    color={color}
                                    fillColor={color}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}
import { CircleMarker } from "react-leaflet";

export default function GraduatedSymbolMap({dataMapKey, data, color}){
    if(!data){
        return null;
    }

    return (
        <div key={dataMapKey}>
            {data.map((prop) => {
                return (
                    <CircleMarker
                        center={[prop.lat, prop.lng]}
                        radius={prop.radius}
                        fillOpacity={0.5}
                        stroke={false}
                        eventHandlers={{
                            mouseover: (e) => {
                                const layer = e.sourceTarget;
                                layer.bringToBack();
                            },
                        }}
                        color={color}
                    />
                );
            })}
        </div>
    )
}
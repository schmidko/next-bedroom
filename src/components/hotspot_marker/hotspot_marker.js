import React, {PureComponent} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

/**
 * Markers
 */
class HotspotMarker extends PureComponent {
    /**
     * Render
     * @return {jsx}
     */
    render() {
        const {hotspots} = this.props;

        const hotspots_jsx = [];
        for (const [key, hotspot] of hotspots.entries()) {
            const lat = hotspot.geo_lat;
            const long = hotspot.geo_long;
            hotspots_jsx.push(
                <Marker key={key} latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
                    <div
                        className="app--hotspot-circle"
                        style={{width:hotspot.amount, height: hotspot.amount}}
                    >
                        <div className="bezirk-label" style={{lineHeight: hotspot.amount+"px"}}>{hotspot.name}</div>
                    </div>
                </Marker>
            );
        }

        return hotspots_jsx;
    }
}

export default HotspotMarker;

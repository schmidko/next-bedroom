import React, {PureComponent} from 'react';
import {Marker} from 'react-map-gl';
import {Tooltip, Typography} from '@material-ui/core';

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
                        <Tooltip
                            title={
                                <React.Fragment>
                                    <Typography variant="subtitle2" color="inherit">{hotspot.name}</Typography>
                                    <Typography variant="subtitle2" color="inherit">Anzahl der Infizierten: {hotspot.amount}</Typography>
                                </React.Fragment>
                            } arrow>
                                <div className="bezirk-label" style={{lineHeight: hotspot.amount+"px"}} />
                        </Tooltip>
                    </div>
                </Marker>
            );
        }

        return hotspots_jsx;
    }
}

export default HotspotMarker;

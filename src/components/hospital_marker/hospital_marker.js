import React, {PureComponent} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {LocalHospital} from '@material-ui/icons';

/**
 * Markers
 */
class HospitalMarker extends PureComponent {
    /**
     * Render
     * @return {jsx}
     */
    render() {
        const {hospitals} = this.props;

        const hospitals_jsx = [];
        for (const [key, hospital] of hospitals.entries()) {
            const lat = hospital.geo_lat;
            const long = hospital.geo_long;
            
            hospitals_jsx.push(
                <Marker key={key} latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
                    <div
                        className="app--hospital-box"
                    >
                        <LocalHospital style={{color: "#4caf50"}} />
                        <div>202</div>
                    </div>
                </Marker>
            );
        }

        return hospitals_jsx;
    }
}

export default HospitalMarker;

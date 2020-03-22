import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import { Typography } from '@material-ui/core';
import { LocalHospital } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Markers
 */
class HospitalMarker extends PureComponent {
    /**
     * Render
     * @return {jsx}
     */
    render() {
        const { hospitals } = this.props;
        const hospitals_jsx = [];
        for (const [key, hospital] of hospitals.entries()) {
            const lat = hospital.geo_lat;
            const long = hospital.geo_long;
            const name = hospital.name;
            const beds_intensiv_free = hospital.beds[0].beds_intensiv_free;
            const beds_intensiv_gesamt = hospital.beds[0].beds_intensiv_gesamt;
            const beds_normal_free = hospital.beds[0].beds_normal_free;
            const beds_normal_gesamt = hospital.beds[0].beds_normal_gesamt;

            hospitals_jsx.push(

                <Marker key={key} latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
                    <Tooltip
                        title={
                            <React.Fragment>
                                <Typography variant="subtitle2" color="inherit">{name}</Typography>
                                <Typography variant="subtitle2" color="inherit">Intensivbetten: {beds_intensiv_free}/{beds_intensiv_gesamt}</Typography>
                                <Typography variant="subtitle2" color="inherit">Normale Betten: {beds_normal_free}/{beds_normal_gesamt}</Typography>
                            </React.Fragment>
                        } arrow>
                        <div
                            className="app--hospital-box">
                            <LocalHospital style={{color: "#4caf50"}} />
                            <div>{beds_intensiv_free}</div>
                        </div>
                    </Tooltip>
                </Marker>

            );
        }

        return hospitals_jsx;
    }
}

export default HospitalMarker;

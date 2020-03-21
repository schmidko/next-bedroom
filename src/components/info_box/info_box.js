import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import './info_box.scss';
import history from '../../history';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Button, Typography, NativeSelect, FormControl, InputLabel} from '@material-ui/core';

const Axios = require('axios');

/**
 * App
 */
class InfoBox extends React.Component {

    state = {
        loading: true,
        bezirke: [],
        selectedBezirk: "All"
    };

    /**
     * lifecycle hook
     */
    componentDidMount() {
        this.loadData();
    }

    /**
     * loadData
     */
    loadData = () => {
        const bezirke = [
            "Mitte",
            "Friedrichshain-Kreuzberg",
            "Pankow",
            "Charlottenburg-Wilmersdorf",
            "Spandau",
            "Steglitz-Zehlendorf",
            "Tempelhof-Schöneberg",
            "Neukölln",
            "Treptow-Köpenick",
            "Marzahn-Hellersdorf",
            "Lichtenberg",
            "Reinickendorf"
        ];
        // https://de.wikipedia.org/wiki/Verwaltungsgliederung_Berlins

        this.setState({
            bezirke: bezirke,
            loading: false
        })
    }

    /**
     * handle Select
     */
    handleSelect = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleButton() {
        this.setState({});
        
    }

    /**
     * @return {null|*}
     */
    render() {
        if (this.state.loading === true) {
            return null;
        }
        return (
            <div className="ib--main">
                <Typography className="title" variant="h6" gutterBottom>Bed Availability</Typography>
                <FormControl>
                    <InputLabel >Bezirk</InputLabel>
                    <NativeSelect
                        value={this.state.selectedBezirk}
                        onChange={this.handleSelect}
                        name="Bezirk"
                        className="select"
                        inputProps={{
                            name: 'selectedBezirk'
                        }}
                    >
                        <option key="all" value="All">All</option>
                        {this.state.bezirke.map((bezirk)=>{
                            return <option key={bezirk} value={bezirk}>{bezirk}</option>;
                        })}
                    </NativeSelect>
                </FormControl>
                <Typography className="title" variant="h6" gutterBottom>Capacity Trend</Typography>
                
                <Button className="ib--button"
                    size="small" 
                    variant="contained" 
                    color="primary"
                    onClick={() => this.props.handleToggle()}
                >
                    Bettenbelegung melden!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_object: state.user_object
    };
};

export default hot(connect(mapStateToProps)(InfoBox));

InfoBox.propTypes = {
    dispatch: PropTypes.func,
    user_object: PropTypes.object
};


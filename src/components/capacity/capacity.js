import React from 'react';
import './capacity.scss';
import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogTitle, TextField, Input, InputAdornment} from '@material-ui/core';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';

const Axios = require('axios');

/**
 * App
 */
class Capacity extends React.Component {

    state= {
        hospitalCode: "",
        totalBeds: 300,
        freeBeds: 50,
        totalIntensiveBeds: 100,
        freeIntensiveBeds: 10
    }
    /**
     * handleChangeInput
     * @param {e} object
     * @param {string} stateName
     */
    handleChangeInput = (e, stateName) => {
        this.setState({[stateName]: e.target.value});
    }
    /**
     * handleSaveCapacity
     */
    handleSaveCapacity = () => {

    }
    /**
     * @return {null|*}
     */
    render() {
        return (<Dialog
            open={this.props.isOpen}
            onClose={this.props.handleClose}
        >
            <div className="capacity-main">
                <DialogTitle>Add Bed Capacity</DialogTitle>
                
                <form noValidate autoComplete="off">
                    <div className="form-row">
                        <TextField 
                            required fullWidth
                            label="Unique Hospitals Code" 
                            value={this.state.hospitalCode}
                            inputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocalHotelIcon />
                                  </InputAdornment>
                                )
                              }}
                            onChange={(e)=>this.handleChangeInput(e, 'hospitalCode')}
                        />
                    </div>
                    <div className="form-row">
                        <TextField 
                            required id="capacity-input" 
                            label="Total Beds" 
                            value={this.state.totalBeds}
                            onChange={(e)=>this.handleChangeInput(e, 'totalBeds')}
                        />
                        <TextField 
                            required id="capacity-input" 
                            label="Free Beds" 
                            value={this.state.freeBeds} 
                        />
                    </div>
                    <div className="form-row">
                        <TextField 
                            required id="capacity-input" 
                            label="Total Intensive Beds" 
                            value={this.state.totalIntensiveBeds} 
                        />
                        <TextField 
                            required id="capacity-input" 
                            label="Free Intensive Beds" 
                            value={this.state.freeIntensiveBeds} 
                        />
                    </div>
                    <DialogActions>
                        <Button variant="contained" onClick={this.props.handleClose} color="inherit">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleSaveCapacity} color="primary">
                            Submit
                        </Button>
                    </DialogActions>

                </form>
            </div>        
        </Dialog>
        );
    }
}

export default Capacity;

Capacity.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};


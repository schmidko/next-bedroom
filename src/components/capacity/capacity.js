import React, {useState} from 'react';
import './capacity.scss';
import PropTypes from "prop-types";
import {Button, Box, TextField, Typography, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Axios = require('axios');
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * App
 */
class Capacity extends React.Component {

    state= {
        totalBeds: 300,
        freeBeds: 50,
        totalIntensiveBeds: 100,
        freeIntensiveBeds: 10,
        showMessage: false,
        type: "",
        message: ""
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
    handleSaveCapacity = async() => {
        const {totalBeds, freeBeds, totalIntensiveBeds, freeIntensiveBeds} = this.state;
        Axios.post('/api/save', {totalBeds, freeBeds, totalIntensiveBeds, freeIntensiveBeds})
            .then((result)=>{
                this.setState({
                    showMessage: true,
                    type: "success",
                    message: "Successfully saved!"
                });
            })
            .catch((e)=>{
                console.error(e);
                this.setState({
                    showMessage: true,
                    type: "error",
                    message: "Something went wrong..."
                });
            });
    }
    /**
     * @return {null|*}
     */
    render() {
        return (<Box
        >
            <div className="capacity--main">
                <Typography className="title" variant="h6" gutterBottom>Add Bed Capacity</Typography>
                <form noValidate autoComplete="off">
                    <div className="form-row">
                        <TextField
                            fullWidth
                            required id="capacity-input" 
                            label="Total Beds" 
                            value={this.state.totalBeds}
                            onChange={(e)=>this.handleChangeInput(e, 'totalBeds')}
                        />
                    </div>
                    <div className="form-row">
                        <TextField
                            fullWidth 
                            required id="capacity-input" 
                            label="Free Beds" 
                            value={this.state.freeBeds}
                            onChange={(e)=>this.handleChangeInput(e, 'freeBeds')}
                        />
                    </div>
                    <div className="form-row">
                        <TextField
                            fullWidth
                            required id="capacity-input" 
                            label="Total Intensive Beds" 
                            value={this.state.totalIntensiveBeds}
                            onChange={(e)=>this.handleChangeInput(e, 'totalIntensiveBeds')}

                        />
                    </div>
                    <div className="form-row">
                        <TextField
                            fullWidth
                            required id="capacity-input" 
                            label="Free Intensive Beds" 
                            value={this.state.freeIntensiveBeds}
                            onChange={(e)=>this.handleChangeInput(e, 'freeIntensiveBeds')}

                        />
                    </div>
                    <div className="form-row">
                        <Button fullWidth variant="contained" onClick={this.handleSaveCapacity} color="primary">
                            Submit
                        </Button>
                    </div>

                </form>
            </div>
            <Snackbar
                open={this.state.showMessage}
                onClose={()=>this.setState({showMessage: false})}
                autoHideDuration={50000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                className={this.state.type === "error" ? "error" : "success"}
            >
                <Alert onClose={()=>this.setState({showMessage: false})} severity="success">
                    {this.state.message}
                </Alert>
            </Snackbar>       
        </Box>
        );
    }
}

export default Capacity;

Capacity.propTypes = {
};


import React from 'react';
import './side_bar.scss';
import PropTypes from "prop-types";
import {Drawer, Divider, IconButton} from '@material-ui/core';
import Capacity from '../capacity/capacity';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

/**
 * App
 */
class SideBar extends React.Component {


    /**
     * @return {null|*}
     */
    render() {
        return (<Drawer
            open={this.props.isOpen}
            onClose={this.props.handleClose}
            variant="persistent"
            anchor="right"
            className="sidebar--main"
            classes={{
                paper: "sidebar--main"
            }}
        >
            <div className={"switch"}>
                <IconButton onClick={this.props.handleClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </div>
            <Capacity />
            <Divider />
        </Drawer>
        );
    }
}

export default SideBar;

SideBar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};


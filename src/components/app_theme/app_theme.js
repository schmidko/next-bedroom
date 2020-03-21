import React from 'react';
import PropTypes from "prop-types";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#D5001C'
        },
        secondary: {
            main: '#F2F2F2'
        },
        success: {
            main: '#13D246'
        },
        error: {
            main: '#E00000'
        },
        warning: {
            main: '#E2B236'
        }
    }
});

/**
 * @param {Object} props
 * @return {*}
 * @constructor
 */
export default function Theme(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}

Theme.propTypes = {
    children: PropTypes.object
};

import React from 'react';
import PropTypes from "prop-types";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3f51b5'
        },
        secondary: {
            main: '#F2F2F2'
        },
        success: {
            main: '#0f9960'
        },
        error: {
            main: '#db3737'
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

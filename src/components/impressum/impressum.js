import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Modal, Typography, Chip} from '@material-ui/core';
import {Face} from '@material-ui/icons';

import './impressum.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: 0,
        height: "100vh",
        width: "100%",
        flexGrow: 1,
        minWidth: 300,
        zIndex: '-10',
        transform: 'translateZ(0)',
        '@media all and (-ms-high-contrast: none)': {
            display: 'none'
        }
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center'

    },
    paper: {
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '6px'
    }
}));

/**
 * Modal
 */
export default function ServerModal(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);

    let root_style = {};
    if (props.is_impressum_open) {
        root_style = { zIndex: '2000' };
    }

    return (
        <div className={classes.root} ref={rootRef} style={root_style}>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={props.is_impressum_open}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
                onBackdropClick={() => props.handleImpressumOpen()}
                onEscapeKeyDown={() => props.handleImpressumOpen()}
            >
                <div className={classes.paper}>
                    <h2 id="server-modal-title">Impressum</h2>
                    <div id="server-modal-description" className="im--description">
                        <img className="mb10" src="/images/2020-03-18-hackathon.jpg" width="400" />
                        <Typography variant="h6">
                            <Link href="https://wirvsvirushackathon.org/">https://wirvsvirushackathon.org</Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link href="https://www.bundesregierung.de/breg-de/themen/coronavirus/wir-vs-virus-1731968">https://www.bundesregierung.de</Link>
                        </Typography>
                        <Typography className="im--team" variant="h6">
                            Team next-bedroom.de
                        </Typography>
                        <div className="im--names mt10">
                            <div className="mb5">
                                <Chip
                                    className="mr5"
                                    size="small"
                                    icon={<Face />}
                                    label="Nobuko"
                                    variant="outlined"
                                />
                                <Chip
                                    className="mr5"
                                    size="small"
                                    icon={<Face />}
                                    label="Daniela"
                                    variant="outlined"
                                />
                                <Chip
                                    size="small"
                                    icon={<Face />}
                                    label="Sonja"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <Chip
                                    className="mr5"
                                    size="small"
                                    icon={<Face />}
                                    label="Stephan"
                                    variant="outlined"
                                />
                                <Chip
                                    className="mr5"
                                    size="small"
                                    icon={<Face />}
                                    label="Stephan"
                                    variant="outlined"
                                />
                                <Chip
                                    size="small"
                                    icon={<Face />}
                                    label="Alex"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

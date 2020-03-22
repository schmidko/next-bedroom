import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import './info_box.scss';
import history from '../../history';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button, InputLabel, Box, TextField, Fab} from '@material-ui/core';
import Chart from "chart.js";
import AddIcon from '@material-ui/icons/Add';

const Axios = require('axios');

/**
 * App
 */
class InfoBox extends React.Component {

    /**
     * constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        // init state
        this.state = {
            loading: true,
            hospitals: [],
            selectedHospitals: [],
            capacityData: [],
            trendData: [],
            search: ""
        };

        this.capacityChartRef = React.createRef();
        this.trendChartRef = React.createRef();
    }

    /**
     * lifecycle hook
     */
    componentDidMount() {
        this.loadData();
    }

    /**
     * loadData
     */
    loadData = async () => {
        let hospitals = [];
        await Axios.get('/api/all-hospitals?offset=0&limit=5000')
            .then((result)=>{
                hospitals = result.data;
            })
            .catch((e)=>{
                console.error(e);
            })
        const capacityData = [
            {name: "Occupied", value: 1200},
            {name: "Free", value: 150}
        ];
        const trendData = [
            { date: "2020-03-24", value: 80 },
            { date: "2020-03-25", value: 85 },
            { date: "2020-03-26", value: 92 },
            { date: "2020-03-27", value: 88 },
            { date: "2020-03-28", value: 89 },
            { date: "2020-03-29", value: 93 },
        ]

        this.setState({
            hospitals: hospitals,
            capacityData: capacityData,
            trendData: trendData,
            loading: false
        }, () => this.setChart());
    }

    setChart = () => {
        // Capacity Chart
        const myCapaChartRef = this.capacityChartRef.current.getContext("2d");
        const capaLabels = this.state.capacityData.map((item) => item.name);
        const capaValues = this.state.capacityData.map((item) => item.value);
        new Chart(myCapaChartRef, {
            type: 'pie',
            data: {
                labels: capaLabels,
                datasets: [{
                    data: capaValues,
                    backgroundColor: ["#97c4db", "#c1e3f5"]
                }],
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Bed Capacity",
                    position: "top"
                }
            }
        });

        // Trend Chart
        const myTrendChartRef = this.trendChartRef.current.getContext("2d");
        const trendLabels = this.state.trendData.map((item) => item.date);
        const trendValues = this.state.trendData.map((item) => item.value);
        new Chart(myTrendChartRef, {
            type: 'line',
            data: {
                labels: trendLabels,
                datasets: [{
                    data: trendValues,
                    backgroundColor: "#97c4db"
                }],
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Bed Trend (Occupied %)",
                    position: "top"
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                display: false // this will remove only the label
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: '%',
                                fontSize: 9,
                                padding: 0
                            }
                        }
                    ]
                }
            }
        });
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
     * handle to search existing skills
     * @param {event} e 
     */
    search = (e) => {
        this.setState({search: e.target.value});
    }

    /**
     * handle to add skill
     * @param {string} value to be added skill
     */
    handleAddHospital = (value) => {
        if(this.state.employee_skills.includes(value.toLowerCase())){
            this.setState({
                error: true,
                message: "Diese Skill ist schon vorhanden."
            })
        } else {
            let employee_skills = [...this.state.employee_skills];
            employee_skills.push(value.toLowerCase());
            this.setState({
                employee_skills: employee_skills,
                search: ""
            });        
        };
    }
   
    /**
     * handle to delete skill
     * @param {string} value to be deleted skill
     */
    handleDelHospital = (value) => {
        let employee_skills = [...this.state.employee_skills];
        employee_skills.splice( employee_skills.indexOf(value), 1 );
        this.setState({employee_skills: employee_skills});
        
    }
    /**
     * @return {null|*}
     */
    render() {
        if (this.state.loading === true) {
            return null;
        }
        let hospitals_list = this.state.hospitals.filter((hospital)=>!hospital.selected)
        const query = this.state.search;
        if(query && query.length >= 1) {
            hospitals_list = [];
            this.state.hospitals.map(hospital => {
                if(hospital.name.toLowerCase().includes(query)) {
                    hospitals_list.push(hospital);
                };
            })    
        }
        return (
            <div className="ib--main">
                <Box className="select-menu">
                    <Autocomplete
                        id="search-skill"
                        getOptionLabel={option => option.name}
                        options={hospitals_list}
                        renderInput={params => (
                            <TextField
                                className="search-input"
                                {...params}
                                size="small" 
                                label="Search Hospitals" 
                                variant="outlined" 
                                onSelect={this.search}
                            />
                        )}  
                    />
                    {/* <Fab className="" color="primary" onClick={this.handleAddHospital} size="small">
                        <AddIcon />
                    </Fab> */}
                </Box>
                <Box>
                    <canvas width={260} id="capacity" ref={this.capacityChartRef} />
                </Box>
                <Box>
                    <canvas width={260} id="trend" ref={this.trendChartRef} />
                </Box>

                <Button className="ib--button"
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.handleToggle()}
                >
                    Bettenbelegung melden!
                </Button>
                <div onClick={() => this.props.handleImpressumOpen()}>
                    <Typography className="ib--impressum" variant="caption" display="block" gutterBottom>
                        Impressum
                    </Typography>
                </div>
                
                
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


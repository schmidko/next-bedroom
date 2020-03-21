import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import './info_box.scss';
import history from '../../history';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Button, Typography, NativeSelect, FormControl, InputLabel, Box} from '@material-ui/core';
import Chart from "chart.js";


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
            bezirke: [],
            selectedBezirk: "All",
            capacityData: [],
            trendData: []
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

        const capacityData = [
            {name: "Occupied", value: 1200},
            {name: "Free", value: 150}
        ];
        const trendData = [
            {date: "2020-03-24", value: 80},
            {date: "2020-03-25", value: 85},
            {date: "2020-03-26", value: 92},
            {date: "2020-03-27", value: 88},
            {date: "2020-03-28", value: 89},
            {date: "2020-03-29", value: 93},
        ]

        this.setState({
            bezirke: bezirke,
            capacityData: capacityData,
            trendData: trendData,
            loading: false
        }, ()=>this.setChart());
    }

    setChart = () => {
        // Capacity Chart
        const myCapaChartRef = this.capacityChartRef.current.getContext("2d");
        const capaLabels = this.state.capacityData.map((item)=>item.name);
        const capaValues = this.state.capacityData.map((item)=>item.value);
        new Chart(myCapaChartRef, {
            type: 'pie',
            data: {
                labels: capaLabels,
                datasets: [{
                    data: capaValues,
                    backgroundColor: ["#97c4db","#c1e3f5"]
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
        const trendLabels = this.state.trendData.map((item)=>item.date);
        const trendValues = this.state.trendData.map((item)=>item.value);
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
                    text: "Bed Trend",
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
     * @return {null|*}
     */
    render() {
        if (this.state.loading === true) {
            return null;
        }
        return (
            <div className="ib--main">
                {/* <Typography className="title" variant="h6" gutterBottom>Bed Availability</Typography> */}
                <Box>
                    <canvas width={260} id="capacity" ref={this.capacityChartRef} />
                    {/* <Chart
                        data={this.state.capacityData}
                        width={240} height={150}
                    >
                        <PieSeries
                            valueField="value"
                            argumentField="name"
                        />
                        <Legend />
                        <Title text={<div className="chart-title">Bed Capacity</div>}/>
                    </Chart> */}
                </Box>
                <Box>
                    <canvas width={260} id="trend" ref={this.trendChartRef} />
                    {/* <Chart
                        data={this.state.trendData}
                        width={240} height={150}
                    >
                        <LineSeries
                            valueField="value"
                            argumentField="date"
                        />
                        <ArgumentAxis showLabels={false}/>
                        <ValueAxis />
                        <ValueScale name="%" />
                        <Title text={<div className="chart-title">Bed Trend (Occupied%)</div>}/>
                    </Chart> */}
                </Box>
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






import React, {Component} from "react"
import * as d3 from "d3"


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        let dataset = (this.props.data.values).slice(0,5).reverse();
        let labels = (this.props.data.keys).slice(0,5).reverse();
       
        if (!labels[0]){labels[0] = ""; dataset[0]=0;}
        if (!labels[1]){labels[1] = "  "; dataset[1]=0;}
        if (!labels[2]){labels[2] = "   "; dataset[2]=0;}
        if (!labels[3]){labels[3] = "    "; dataset[3]=0;}
        if (!labels[4]){labels[4] = "     "; dataset[4]=0;}
     
        var margin = {
            top: 8,
            right: 0,
            bottom: 5,
            left: 125
        };
        let width_t = 510
        let height_t = 300
        if (window.innerWidth <1000){
            width_t = 300
            height_t = 200
        }
        var width = width_t - margin.left - margin.right,
            height = height_t - margin.top - margin.bottom;
        var svg = d3
            .select(this.refs.chart)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            

    
        var x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(dataset)]);
    
        var y = d3.scaleBand()
            .rangeRound([height, 0])
            .padding(0.15)
            .domain(labels);
        
        var yAxis = d3.axisLeft(y)
            .tickSize(0)
            
        
        svg.append("g")
            .attr("class", "y axis")
            .style("font-family","Ubuntu")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .style("color", "black")
            .style("align-content", "left")
            .call(yAxis)


        var bars = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("g")
        bars.append("rect")

            .attr("fill", "#FFAA00")
            .attr("class", "bar")
            .attr("y", function (d,i) {
                return y(labels[i]);})
            .attr("height", y.bandwidth())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d)
            })
  
            
            .append("title")
            .text(d => "score: " + d);

    
            
    }
  
    componentDidUpdate() {

    d3.select(this.refs.chart).selectAll('svg').remove();
    let dataset = (this.props.data.values).slice(0,5).reverse();
    let labels = (this.props.data.keys).slice(0,5).reverse();

    if (!labels[0]){labels[0] = ""; dataset[0]=0;}
    if (!labels[1]){labels[1] = "  "; dataset[1]=0;}
    if (!labels[2]){labels[2] = "   "; dataset[2]=0;}
    if (!labels[3]){labels[3] = "    "; dataset[3]=0;}
    if (!labels[4]){labels[4] = "     "; dataset[4]=0;}
    
    
    var margin = {
        top: 8,
        right: 0,
        bottom: 5,
        left: 130
    };
    let width_t = 510
    let height_t = 300
    if (window.innerWidth <1000){
        width_t = 300
        height_t = 200
    }
    var width = width_t - margin.left - margin.right,
        height = height_t - margin.top - margin.bottom;
    var svg = d3
        .select(this.refs.chart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
   

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(dataset)]);

    var y = d3.scaleBand()
        .rangeRound([height, 0])
        .padding(0.15)
        .domain(labels);
    
    var yAxis = d3.axisLeft(y)
       
        .tickSize(0)
        
    
    svg.append("g")
        .attr("class", "y axis")
        .style("font-family","Ubuntu")
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .style("color", "black")
        .style("align-content", "left")
        .call(yAxis)
    
 

    var bars = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("g")
    bars.append("rect")
   
        .attr("fill", "#FFAA00")
        .attr("class", "bar")
        .attr("y", function (d,i) {
            return y(labels[i]);})
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d)
        })
        
        .append("title")
        .text(d => "score: " + d);

        
    }

    render() {
        return (
            <div className = "score-wrap" style = {{height: window.innerWidth<1000 && "200px"}}>
                <div ref="chart"></div>
            </div>
        
        );
    }
  }






export default Chart;

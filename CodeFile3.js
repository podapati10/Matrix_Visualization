var margin = { top: 60, right: 160, bottom: 88, left: 105 };
var width = 1260; //- margin.left - margin.right;
var height = 600; //- margin.top - margin.bottom;
let innerWidth = width - margin.left - margin.right;
let innerHeight = height - margin.top - margin.bottom;
let yAxisLabel = 'Time(in seconds)', xAxisLabel = 'N-Value (Range: 16-2048)', title = 'Computation of Matrix Methods';

d3.csv('/Data/MatrixData.csv').then(function(data){
  data.forEach(function(d){
    d.Time = +d.Time;
    d.Value = +d.Value;
  });
draw_lines(data);
});

var svg = d3.select("#svg_chart").append("svg").attr("width", width).attr("height", height)
function myFunction()
{
  location.replace("Home.html")
}
const draw_lines = d => {
var svg_g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

var xValue = d => d.Value;
var yValue = d => d.Time;
    
var xScale = d3.scaleLinear().domain(d3.extent(d, xValue)).range([0, innerWidth]).nice();
    
var yScale = d3.scaleLinear().domain(d3.extent(d, yValue)).range([innerHeight, 0]).nice();
    
var Method_color = d3.scaleOrdinal(d3.schemePastel1)
var xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(15).ticks(8);
var xAxisG = svg_g.append("g").attr('transform', `translate(0,${innerHeight})`).call(xAxis);
    
var yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10).ticks(8);
var yAxisG = svg_g.append("g").call(yAxis);
    
yAxisG.append('text').attr('class', 'axis-label').attr('y', -60).attr('x', -innerHeight / 2)
      .attr('fill', 'black').attr('transform', `rotate(-90)`).attr('text-anchor', 'middle').text(yAxisLabel);

xAxisG.append('text').attr('class', 'axis-label').attr('y', 80).attr('x', innerWidth / 2).attr('fill', 'black').text(xAxisLabel);
    
var line = d3.line().x(d => xScale(xValue(d))).y(d => yScale(yValue(d))).curve(d3.curveBasis);

const lastYValue = d => yValue(d.values[d.values.length - 1]);

const nested = d3.nest().key(d => d.Method).entries(d).sort((a, b) =>
d3.descending(lastYValue(a), lastYValue(b)));

Method_color.domain(nested.map(d => d.key));

svg_g.selectAll('.line').data(nested).enter().append("path").attr("class", "line")
     .attr("d", d => line(d.values)).style("stroke", d => Method_color(d.key));
    
svg_g.append('text').attr('class', 'title').attr('y', -10).text(title);

var legend = svg.selectAll(".legend").data(Method_color.domain()).enter().append("g").attr("class", "legend");

legend.append("rect").attr("x", margin.right).attr("y", function(d,i){ return (margin.right/2) + i*margin.top})                     
      .attr("width", margin.top/2).attr("height", margin.top/2).style("stroke", "#000").style("fill", Method_color);
              
legend.append("text").attr("x", 210).attr("y", function(d,i){ return 100 + i*margin.top}).text(function(d) { return (d); });
}
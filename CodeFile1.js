
///////////// Chapter 1. Data Loading //////////////
var data_location = 'iris.data'
var iris_data;
d3.csv('iris.csv').then(function(data){
  data.forEach(function(d){
    // convert string to number
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
  });
  iris_data = data;
  console.log(iris_data);
  // perform initialization after data is loaded.
  draw_scatterpoints(iris_data);
  assign_brush_events(iris_data);
});
///////////// Chapter 1. End /////////////

///////////// Chapter 2. Scatter Plot Initialization //////////////

const padding = 30
const scatterplot_size = 400
const scatterpoint_radius = 5
const svg_width = scatterplot_size * 2 + padding * 6
const svg_height = scatterplot_size + padding * 2
const plotB = scatterplot_size + padding * 5

var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// draw svg canvas
var svg = d3.select('#svg_chart').append('svg')
.attr('width', svg_width+150)
.attr('height', svg_height);

svg.append("style")
.text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);

// draw scatterplot borders
svg.append('rect').attr('fill', 'none').attr('stroke', 'black')
.attr('x', padding*2).attr('y', padding/5)
.attr('width', scatterplot_size+ (scatterpoint_radius*2))
.attr('height', scatterplot_size);

svg.append('rect').attr('fill', 'none').attr('stroke', 'black')
.attr('x', plotB).attr('y', padding/5)
.attr('width', scatterplot_size+(scatterpoint_radius*2))
.attr('height', scatterplot_size);

// make scatterplot point groups
var sepal_scatterplot = svg.append('g')
.attr('class', 'sepal_group')
.attr('transform', "translate("+(padding*2)+","+padding/5+")");

var petal_scatterplot = svg.append('g')
.attr('class', 'petal_group')
.attr('transform',"translate("+plotB+","+padding/5+")");

// useful scales for mapping cx and cy for scatter points
var sepal_length_scale = d3.scaleLinear().domain([4.3, 7.9]).range([scatterplot_size, 0]).nice();

var sepal_width_scale = d3.scaleLinear().domain([4.6, 1.8]).range([0, scatterplot_size+ (scatterpoint_radius*2)]).nice();

var petal_length_scale = d3.scaleLinear().domain([0.7, 7.1]).range([scatterplot_size, 0]);

var petal_width_scale = d3.scaleLinear().domain([2.7, 0]).range([0, scatterplot_size+(scatterpoint_radius*2)]).nice();

var class_color = d3.scaleOrdinal(d3.schemePastel1)
function draw_scatterpoints(data)
{  



 //TODO: Finish drawing scatterplots by adding legends and axis.
var xSAxis = d3.axisBottom(sepal_width_scale);
var xSAxisG = sepal_scatterplot.append('g').call(xSAxis).attr('transform', "translate(0,"+scatterplot_size+")");
  
var ySAxis = d3.axisLeft(sepal_length_scale);
var ySAxisG = sepal_scatterplot.append('g').call(ySAxis);

var xPAxis = d3.axisBottom(petal_width_scale);
var xPAxisG = petal_scatterplot.append('g').call(xPAxis).attr('transform',"translate(0,"+scatterplot_size+")");

var yPAxis = d3.axisLeft(petal_length_scale)
var yPAxisG = petal_scatterplot.append('g').call(yPAxis);

ySAxisG.append('text').attr('class', 'axis-label')
  .attr('y', 0-padding*1.25)
  .attr('x', 0-scatterplot_size*2/scatterpoint_radius)
  .attr('fill', 'black')
  .attr('transform', `rotate(-90)`)
  .text('Sepal Length')
  .attr('font-size', '20');

xSAxisG.append('text').attr('class', 'axis-label')
  .attr('y', padding*1.5).attr('x', scatterplot_size/2)
  .attr('fill', 'black').text('Sepal Width')
  .attr('font-size', '20');

yPAxisG.append('text').attr('class', 'axis-label')
  .attr('y', 0-padding*1.25)
  .attr('x', 0-scatterplot_size*2/scatterpoint_radius)
  .attr('fill', 'black')
  .attr('transform', `rotate(-90)`)
  .text('Petal Length')
  .attr('font-size', '20');

xPAxisG.append('text').attr('class', 'axis-label')
  .attr('y', padding*1.25).attr('x', scatterplot_size/2)
  .attr('fill', 'black').text('Petal Width')
  .attr('font-size', '20');


  //TODO: append points to the scatterplot.
  var sepal_points = sepal_scatterplot.selectAll('circle').data(data);
  var petal_points = petal_scatterplot.selectAll('circle').data(data);

  sepal_points.enter().append('circle').merge(sepal_points)
  .attr("cx", d => sepal_width_scale(d.sepal_width))
  .attr("cy", d => sepal_length_scale(d.sepal_length))
  .attr("r",scatterpoint_radius).attr("fill", d => class_color(d.class))
  
  petal_points.enter().append('circle').merge(petal_points)
  .attr("cx", d => petal_width_scale(d.petal_width))
  .attr("cy", d => petal_length_scale(d.petal_length))
  .attr("r",scatterpoint_radius).attr("fill", d => class_color(d.class))

var legend = svg.selectAll(".legend").data(class_color.domain()).enter().append("g").attr("class", "legend");

legend.append("rect").attr("x", svg_width).attr("y", function(d,i){ return (padding) + i*padding})                     
                    .attr("width", padding/2)
                    .attr("height", padding/2)
                    .style("stroke", "#000")
                    .style("fill", class_color);
              
legend.append("text")
                    .attr("x", svg_width+padding)
                    .attr("y", function(d,i){ return (padding*1.4) + i*padding})                     
                    .text(function(d) { return (d); });
}
///////////// Chapter 2. End /////////////

function myFunction()
{
  location.replace("index.html")
}

///////////////// Chapter 3. Brush /////////////////
function assign_brush_events(d){
  var sepal_points = sepal_scatterplot.selectAll('circle');
  var petal_points = petal_scatterplot.selectAll('circle');
  var circles = svg.selectAll('circle').data(d);

  var brush = d3.brush()
    .extent([[0, 0], [scatterplot_size, scatterplot_size]])
    .on('start', brushstarted)
    .on('brush', brushed)
    .on('end', brushend);
  
  sepal_scatterplot.call(brush);
  petal_scatterplot.call(brush);

  let selecting_scatterplot;

  //TODO: implement the following 3 sub-functions
  function brushstarted()
  {
    if (selecting_scatterplot !== this) 
    {
      d3.select(selecting_scatterplot).call(brush.move, null);
      selecting_scatterplot = this;
    }
  }

  function brushed(){
    if (d3.event.selection === null) return;
    var [[x0, y0], [x1, y1]] = d3.event.selection;
    
    if (selecting_scatterplot.attributes['class'].value=='petal_group'){ 
      svg.selectAll('circle').classed("hidden", d => {
      return x0 > petal_width_scale(d.petal_width)
      || x1 < petal_width_scale(d.petal_width)
      || y0 > petal_length_scale(d.petal_length)
      || y1 < petal_length_scale(d.petal_length);
});  
}
else{
  svg.selectAll('circle').classed("hidden", d => {
  return x0 > sepal_width_scale(d.sepal_width)
  || x1 < sepal_width_scale(d.sepal_width)
  || y0 > sepal_length_scale(d.sepal_length)
|| y1 < sepal_length_scale(d.sepal_length);
});
}
  }

  function brushend()
  {
    if (d3.event.selection !== null) return;
    sepal_points.classed("hidden", false);
    petal_points.classed("hidden", false);
  }
}

///////////// Chapter 3. End /////////////

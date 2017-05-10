// BAR CHART

// Chart variables

var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// Loading in the data

d3.csv("../data/sales.csv", function(error, data) {

    var names = []; 
    var sales = [];

    if (error) {
        console.log(error);                                 // Error Logging
    }

    else { 
        for (var i = 0; i < data.length; i++) {             // Unpacking the data for x & y variables
            names.push(data[i]['salesperson']);
            sales.push(data[i]['sales']);
        }
    }

// Creating the Chart

    var chart1 = d3.select("#chart1-container")                             // Selecting the container                     
                    .append("svg")                                          // Append SVG
                    .attr("width", width + margin.left + margin.right)      // Set width
                    .attr("height", height + margin.top + margin.bottom)    // Set height
                    .append("g")                                            // Append a new group
                    .attr("transform",                                      
                    "translate(" + margin.left + "," + margin.top + ")");   // Translates the axes into the correct place

// Creating the scales

    var x = d3.scaleBand()                                                  // Creating an Ordinal Scale
              .rangeRound([0, width])                                       // Setting the range
              .padding(0.2)                                                 // Sets the padding in between the bars
              .domain(names);                                               // Setting the domain (array of x values)

    var y = d3.scaleLinear()                                                // Creating a Linear Scale 
              .rangeRound([height, 0])                                      // Setting the range (pixels)
              .domain([0, d3.max(sales)])                                   // Setting the domain (data)
              .nice();                                                      // Puts nice numbers on the scale (10,20,30,40...)

// Creating the Bars

    chart1.selectAll("rect")                                                // Selecting the (uncreated) bars
            .data(data)                                                     // Appending the data to the selection
            .enter()                                                        // Creates a new empty bar for each item in the data
            .append("rect")                                                 // Appends an actual bar to the empty bar
            .attr("x", function(d) { 
                return x(d.salesperson);                                    // Horizontal positioning of the bar
            })            
            .attr("width", x.bandwidth())                                   // Dynamically sizes the bar width / padding with our x variable
            .attr("y", function(d) {
                return y(d.sales);                                          // Dynamically sizes the bar height / padding with our y variable
            })
            .attr("height", function(d) {
                return height - y(d.sales);                                 // Binding data to the height of the bar
            })
            .attr("fill","steelblue")                                       // Adding colour 
            .on("mouseover", function (d) {                                 // Adding mouseover interactivity

                // Set the position of the tooltip

                var xPosition = parseFloat(d3.select(this).attr("x")) + x.bandwidth() / 2;
                var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;

                // Filling the bar orange on hover

                d3.select(this)
                  .transition()
                  .duration(500)
                  .attr("fill", "orange");

                // Creating the tooltip

                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d);

                // Showing the tooltip

                d3.select("#tooltip")
                    .classed("hidden", false);
            })
            .on("mouseout", function () {                                   // Adding mouseout interactivity

                // Returning the bars to normal

                d3.select(this)
                  .transition()
                  .duration(250)
                  .attr("fill", "steelblue");

                // Hiding the tooltip

                d3.select("#tooltip").classed("hidden", true);

            });


// Render the axes

    chart1.append("g")                                                      // Append a new group
        .attr("transform", "translate(0," + height + ")")                   //  
        .call(d3.axisBottom(x));                                            // Rendering the axis

    chart1.append("g")                                                      // Append a new group
        .call(d3.axisLeft(y));                                              // Rendering the axis

});
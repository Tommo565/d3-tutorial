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

    var xScale = d3.scaleBand()            // Creating an Ordinal Scale
              .rangeRound([0, width])      // Setting the range
              .padding(0.2)                // Sets the padding in between the bars
              .domain(names);              // Setting the domain (array of x values)

    var yScale = d3.scaleLinear()          // Creating a Linear Scale 
              .rangeRound([height, 0])     // Setting the range (pixels)
              .domain([0, d3.max(sales)])  // Setting the domain (data)
              .nice();                     // Puts nice numbers on the scale (10,20,30,40...)

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

// Creating the axes



// Creating the Bars

    chart1.selectAll("rect")                    // Selecting the (uncreated) bars
        .data(data)                             // Appending the data to the selection
        .enter()                                // Creates a new empty bar for each item in the data
        .append("rect")                         // Appends an actual bar to the empty bar
        .attr("x", function(d) { 
            return xScale(d.salesperson);       // Horizontal positioning of the bar
        })            
        .attr("width", xScale.bandwidth())      // Dynamically sizes the bar width / padding with our x variable
        .attr("y", function(d) {
            return yScale(d.sales);             // Dynamically sizes the bar height / padding with our y variable
        })
        .attr("height", function(d) {
            return height - yScale(d.sales);    // Binding data to the height of the bar
        })
        .attr("fill","steelblue");              // Adding colour

// Render the axes

    chart1.append("g")                                      // Append a new group
        .attr("transform", "translate(0," + height + ")")   // Moving the x Axis to the bottom
        .call(xAxis);                                       // Rendering the axis

    chart1.append("g")                                      // Append a new group
        .call(yAxis);                                       // Rendering the axis

// Interactivity

    chart1.selectAll("rect")
        .on("mouseover", function (d) { 

            var xPosition = parseFloat(d3.select(this).attr("x"))  ;        // x position of the tooltip
            var yPosition = parseFloat(d3.select(this).attr("y")) - 10;     // y position of the tooltip

            d3.select(this)                         // Select the rect being hovered over
              .transition()                         // Enable a transition effect
              .duration(500)                        // Set the duration of the transition effect
              .attr("fill", "orange");              // Setting the fill colour

            // Creating the tooltip

            d3.select("#tooltip")                   // Selecting the tooltip div
                .style("left", xPosition + "px")    // Setting the x position of the tooltip
                .style("top", yPosition + "px")     // Setting the y position of the tooltip
                .select("#value")                   // Selecting the span value
                .text(d.sales);                     // Appending the data value to the tooltip

            // Showing the tooltip

            d3.select("#tooltip")
                .classed("hidden", false);          // Unhide the tooltip
        })

        .on("mouseout", function () {                                   

            // Returning the bars to normal

            d3.select(this)                         // Select the rect being left
                .transition()                         // Enable a transition effect
                .duration(250)                        // Set the duration of the transition effect
                .attr("fill", "steelblue");           // Returning the fill to normal

            // Hiding the tooltip

            d3.select("#tooltip")                   // Selecting the tooltip div
                .classed("hidden", true);           // Hide the tooltip

        });

}); // End of function!


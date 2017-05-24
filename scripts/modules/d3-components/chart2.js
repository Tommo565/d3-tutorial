// RESPONSIVE LINE CHART

// Chart variables

var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = $('#chart2-container').width() - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var parseTime = d3.timeParse("%d-%b-%y");


function drawChart2 () {

    // Creating the Scales

    var xScale = d3.scaleTime()
                   .rangeRound([0, width])
                   .nice();

    var yScale = d3.scaleLinear()
                   .rangeRound([height, 0])
                   .nice();

    // Creating the line

    var valueline = d3.line()
                    .curve(d3.curveCardinal)  
                    .x(function(d) { 
                        return xScale(d.date); 
                    })
                    .y(function(d) { 
                        return yScale(d.close); 
                    });

    // Creating the SVG

    chart2 = d3.select("#chart2-container")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                          "translate(" + margin.left + "," + margin.top + ")");

    // Importing & applying the data 

    d3.csv("../data/line.csv", function(error, data) {

        if (error) throw error;

        data.forEach(function(d) {              // format the data

            d.date = parseTime(d.date);
            d.close = +d.close;

        });

        // Applying data to the scales

        xScale.domain(d3.extent(data, function(d) { 
            return d.date; 
        }));

        yScale.domain([0, d3.max(data, function(d) { 
            return d.close; 
        })]);


        chart2.append("clipPath")           // Make a new clipPath
            .attr("id", "chart-area")       // Assign an ID
            .append("rect")                 // Within the clipPath, create a new rect
            .attr("x", 0)                   // Set rect's position and size…
            .attr("y", -10)
            .attr("width", width)
            .attr("height", height + 10)
            .style("fill", d3.rgb(230, 230, 230));

        chart2.append("path")               // Add the valueline path.
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        chart2.selectAll("dot")             // Adding scatter dots
            .data(data)
            .enter()
            .append("circle")
            .attr("clip-path", "url(#chart-area)")
            .attr("r", 5)
            .attr("stroke","steelblue")
            .attr("stroke-width",2)
            .attr("fill","white")
            .attr("cx", function(d) { 
                return xScale(d.date); 
            })
            .attr("cy", function(d) { 
                return yScale(d.close);
            });

        // Add the Axes

        chart2.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)
                .tickSize(0, 0)
                .ticks(2)
                .tickPadding(10));

        chart2.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Date");

        chart2.append("g")
            .call(d3.axisLeft(yScale)
                .tickSize(0, 0)
                .tickPadding(7));

        chart2.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Value");

    });

}

function redrawChart2 () {
    
    width = $('#chart2-container').width() - margin.left - margin.right;

    if (width < 600) {
        width = 600 - margin.left - margin.right;
    }

    $("#chart2-container").empty()
    drawChart2();
}

drawChart2();
window.addEventListener("resize", redrawChart2);


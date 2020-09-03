 // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoData(data.names[0]);
        });
    }
    
   




function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  
 d3.json("samples.json").then((data)=> {

   //building bubble chart
    var x_values = data.otu_ids;
    var y_values = data.sample_values;
    var m_size = data.sample_values;
    var colors = data.otu_ids; 
    var text_values = data.otu_labels;

    var trace1 = {
      x: x_values,
      y: y_values,
      text: text_values,
      mode: 'markers',
      marker: {
        color: colors,
        size: m_size
      } 
    };
  
    var data = [trace1];

    var layout = {
      xaxis: { title: "OTU ID"},
    };

    Plotly.newPlot('bubble', data, layout);
   

    //build bar chart
    d3.json("samples.json").then((data)=> { 
    var pie_values = data.sample_values.slice(0,10);
      var pie_labels = data.otu_ids.slice(0,10);
      var pie_hover = data.otu_labels.slice(0,10);

      var data = [{
        values: bar_values,
        labels: bar_labels,
        hovertext: bar_hover,
        type: 'bar'
      }];

      Plotly.newPlot('bar', data);

    });
  });   
}




function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

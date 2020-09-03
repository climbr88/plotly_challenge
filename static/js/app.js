function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            
            var ids = sampledata.samples[0].otu_ids;
            
            var sample_values =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
        // slice top 10 otu ids  
            var otu_top10 = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        
            var otu_id = otu_top10.map(d => "OTU " + d);
            
         // slice top 10 labels
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
            var trace = {
                x: sample_values,  
                y: otu_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);
            
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // set the layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // creating data variable 
            var data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // create the function to get the necessary data
    function getDemoData(id) {
    // read json 
        d3.json("samples.json").then((data)=> {
    // get metadata info 
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
             
         // get demographic data and append info to panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
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
    
    init();
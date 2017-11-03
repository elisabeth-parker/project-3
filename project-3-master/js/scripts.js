var rnd = [];
var opp = [];
var match_len = [];
var sets = [];
var games = [];
var s_won = [];
var opp_won = [];
var sss = [];
var oss = [];
var sa = [];
var oa = [];
var sdf = [];
var odf = [];


$(document).ready(function(){
    $('#tbl').DataTable( {
      "ajax": '../swdata.txt'
    });
    $('#mobile-tbl').DataTable( {
      "ajax": '../mobile-swdata.txt'
    });
    document.getElementById('mobile-tbl_wrapper').classList.add('mobile');
    loadData();

});

function loadData() {
  $.ajax({
            type:"GET",
            url:"../data.json",
            dataType:"text",
            success: parseData
  })
}

function parseData(data) {
  dataObj = $.parseJSON(data);
    //console.log(dataObj);

  for (var i = 0, len = dataObj.length; i < len; ++i) {
          //sets data to arrays for charts
          rnd.push(dataObj[i]["Round"]);
          opp.push(dataObj[i]["Opponent"]);
          match_len.push(dataObj[i]["Match length"]);
          sets.push(dataObj[i]["Sets played"]);
          games.push(dataObj[i]["Games played"]);
          s_won.push(dataObj[i]["Games won by Serena"]);
          opp_won.push(dataObj[i]["Games won by opponent"]);
          sss.push(dataObj[i]["Serena serve speed (average, in KPH)"]);
          oss.push(dataObj[i]["Opponent serve speed (average, in KPH)"]);
          sa.push(dataObj[i]["Serena aces"]);
          oa.push(dataObj[i]["Opponent aces"]);
          sdf.push(dataObj[i]["Serena double faults"]);
          odf.push(dataObj[i]["Opponent double faults"]);

   }
   console.log(rnd);
   console.log(match_len);
   createCharts();
}

function createCharts() {

  var tournChart = c3.generate({
    bindto: '#tourn-chart',
    data: {
        json: {
            data1: match_len,
            data2: games
        },
        names: {
           data1: 'Match length',
           data2: 'Games played'
        },
        axes: {
          data2: 'y2' // ADD
        },
        types: {
          data1: 'line',
          data2: 'bar'
        },
        colors: {
            data1: '#3188a8',
            data2: '#cae2e8',
        },
    },
    axis: {
      y: {
        label: "Minutes"
      },
      y2: {
        show: true, // ADD
        label: 'Number of games'
      }
    }
  });

  // creating pie charts for points won in each match
  var pie1;
  var pie2;
  var pie3;
  var pie4;
  var pie5;
  var pie6;
  var pie7;
  var pieCharts = [pie1, pie2, pie3, pie4, pie5, pie6, pie7];

  for(i=0; i<rnd.length; i++) {
    pieCharts[i] = c3.generate({
      bindto: '#pie'+(i+1),
      data: {
        json: {
          data1: s_won[i],
          data2: opp_won[i]
        },
        type: 'pie',
        names: {
          data1: 'Games won by Serena',
          data2: 'Games won by ' + opp[i]
        },
        colors: {
          data1: '#3188a8',
          data2: '#cae2e8'
        }
      },
      pie: {
        label: {
          format: function(value, ratio, id) {
            return value;
          }
        }
      }
    })
  }

  var serveChart = c3.generate({
    bindto: '#serveChart',
    data: {
      columns: [
        rnd,
      ],
      json: {
        data1: sss,
        data2: oss,
        data3: sa,
        data4: oa,
        data5: sdf,
        data6: odf
      },
      types: {
        data1: 'scatter',
        data2: 'scatter',
        data3: 'bar',
        data4: 'bar',
        data5: 'bar',
        data6: 'bar'
      },
      axes: {
        data3: 'y2',
        data4: 'y2',
        data5: 'y2',
        data6: 'y2'
      },
      colors: {
          data1: '#29667D',
          data2: '#8DCCDB',
          data3: '#0DA65C',
          data4: '#B3F6D1',
          data5: '#993004',
          data6: '#EAC1B2',
      },
      names: {
          data1: 'Serena serve speed (avg)',
          data2: 'Opponent serve speed (avg)',
          data3: 'Serena aces',
          data4: 'Opponent aces',
          data5: 'Serena double faults',
          data6: 'Opponent double faults',
      },
    },
    axis: {
      x: {
        type:'category',
        categories: rnd //thanks to Stack Overflow user Dan Delaney for documentation on changing tick labels
      },
      y: {
        label: "Speed (KPH)"
      },
      y2: {
        show: true, // ADD
        label: 'Number of aces/double faults'
      }
    },
    point: {
      r: 10,
    }
  })
}

function openCity(cityName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
        tablinks[i].style.color = "white";
        tablinks[i].style.boxShadow = 'none';
    }

    // Show the specific tab content
    document.getElementById(cityName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
    elmnt.style.color = 'black';
    elmnt.style.boxShadow = '1px 1px 3px lightgrey';
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

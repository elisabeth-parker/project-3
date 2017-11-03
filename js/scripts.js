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
    }

    // Show the specific tab content
    document.getElementById(cityName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
    elmnt.style.color = 'black';
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

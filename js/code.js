// "use strict";

$(async function() {
  chooseAbout();
  chooseReports();
  chooseCoins();
  filter();
  $("#about").hide();
  $("#chartContainer").hide();

  // Get coins Info from center button

  $("#showCoins").click(async function() {
    $("#showCoins").text("PUSH AGAIN FOR NEW REQUEST");
    showLoader();
    await start1();
    removeLoader();
  });

  async function start1() {
    await displayCoins();
    await toggleSwitch();
    await showCoinInfo();
  }

  // Smooth scroll

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});

// Navigation menu

function chooseCoins() {
  $("#coins").click(function() {
    $("#about").hide();
    $("#chartContainer").hide();
    $("#body").show();
  });
}

function chooseAbout() {
  $("#aboutUs").click(function() {
    $("#about").empty();
    let bodyText =
      "<div class='ronAbout half left'><p class='description'><u>About Me</u></p><br><p>Hi! My name is Ron. I’m 31 years old and I love to write code scripts for websites , build colorful wordpress themes, learn new programming languages and much more. in my free time I'm learning Italian and sing in a rock n roll band.</p><br><p class='description'><u>About the project</u></p><br><p>I built this project with Javascript, HTML, CSS, Bootstrap, Jquery and JSON restful API using Ajax. the main idea of this project is to get information about varity of crypto currency coins using API requests </p></div></div><div class='half left ronImage'><img style='border: 2px solid black;' src='./assets/images/ron.JPG'></div></div>";
    $("#about").append(bodyText);
    $("#chartContainer").hide();
    $("#body").hide();
    $("#about").fadeIn(1000);
  });
}

function chooseReports() {
  $("#reports").click(function() {
    $("#chartContainer").append(displayReports());
    $("#about").hide();
    $("#body").hide();
    $("#chartContainer").show();
  });
}

// Click Reports Button

$("#reports").click(function() {
  $("li > a").removeClass("active");
  $("#reports").addClass("active");
  $("#body").empty();
});

// Get Coins Info - Promise

async function getCoins(url) {
  let coinsPromise = new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: url,
      success: function(response) {
        resolve(response);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
  return coinsPromise;
}

// show Loader for all Coins

let showLoader = function showLoader() {
  $("#body").empty();
  $("#body").append(
    "<div id='loader'><div class='center'><h1>Geting All the Coins....</h1><img src='assets/images/loading.gif'></div></div>"
  );
  return showLoader;
};

function showSmallLoader() {
  $("#pop" + coinId).append(
    "<p>Geting All the info on the coin....</p><img width='50' src='assets/images/loading.gif'>"
  );
}

// remove loader

function removeLoader() {
  $("#loader").empty();
}

function removeSmallLoader() {
  $("#pop" + coinId).empty();
}

// getting all the coin info

function showMeTheCoin(coinId) {
  $("#pop" + coinId).empty();
  $("#pop" + coinId).append(
    "<p>Geting All the info on the coin....</p><img width='50' src='assets/images/loading.gif'>"
  );

  $.ajax({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/" + coinId,
    success: function(response) {
      let image = response.image.large;
      let usd = response.market_data.current_price.usd.toFixed(12);
      let eur = response.market_data.current_price.eur.toFixed(12);
      let ils = response.market_data.current_price.ils.toFixed(12);
      let coinStatus = {
        money: { usd: usd, eur: eur, ils: ils },
        image: image,
        coinId: coinId,
        timeSet: time
      };
      let coinJson = JSON.stringify(coinStatus);
      sessionStorage.setItem(coinId, coinJson);
      setTimeout(() => {
        $("#pop" + coinId).empty();
        $("#pop" + coinId).append(
          "<div class='center'><img width='100' src='" +
            image +
            "'></div><br><p class='green bold'>USD: </p> $" +
            usd +
            "<p class='purple bold'>EUR: </p> €" +
            eur +
            "<p class='blue bold'>ILS: </p> ₪" +
            ils
        );
      }, 1000);
    },
    error: function(err) {
      alert("Error upload coin info");
    }
  });
}

// Remove from storage

function removeCoinFromStorage(coinId) {
  setTimeout(() => {
    sessionStorage.removeItem(coinId);
    $("#pop" + coinId).empty();
  }, 120000);
}

// Show Coin from Local Storage

function showCoinFromLocal(coinId) {
  let coinInfo = sessionStorage.getItem(coinId);
  let coinInformation = JSON.parse(coinInfo);

  $("#pop" + coinId).empty();
  $("#pop" + coinId).append(
    "<div class='center'><img width='100' src='" +
      coinInformation.image +
      "'></div><br><p class='green bold'>USD: </p> $" +
      coinInformation.money.usd +
      "<p class='purple bold'>EUR: </p> €" +
      coinInformation.money.eur +
      "<p class='blue bold'>ILS: </p> ₪" +
      coinInformation.money.ils
  );
}

// show coin Info in the card

let coinId;

function showCoinInfo() {
  $(".btnBody").on("click", async function() {
    let coinId = this.id;
    if (sessionStorage.getItem(coinId) === null) {
      await showMeTheCoin(coinId);
      await removeCoinFromStorage(coinId);
    } else {
      showCoinFromLocal(coinId);
    }
  });
}

// Open Modal

function openModal(toggleCounter, toggleReports) {
  let toggleDiv =
    "<p>" +
    toggleCounter[0] +
    "<button class='switch checked toggleThis' name='" +
    toggleCounter[0] +
    "' id='toggle0'>ON</button></p>" +
    "<p>" +
    toggleCounter[1] +
    "<button class='switch checked toggleThis' name='" +
    toggleCounter[1] +
    "' id='toggle1'>ON</button></p>" +
    "<p>" +
    toggleCounter[2] +
    "<button class='switch checked toggleThis' name='" +
    toggleCounter[2] +
    "' id='toggle2'>ON</button></p>" +
    "<p>" +
    toggleCounter[3] +
    "<button class='switch checked toggleThis' name='" +
    toggleCounter[3] +
    "' id='toggle3'>ON</button></p>" +
    "<p>" +
    toggleCounter[4] +
    "<button class='switch checked toggleThis' name='" +
    toggleCounter[4] +
    "' id='toggle4'>ON</button></p>";

  $("#modalPop").empty();
  $("#modalPop").append(
    "<h4>Hey! You choose too many coins</h4><h6> you can choose up to 5 coins for reports, so Please take off one and continue: </h6><br>" +
      toggleDiv
  );
  $("#myModal").css("display", "block");
  $(".close").click(() => {
    $("#myModal").css("display", "none");
  });

  $(".toggleThis").click(event => {
    let name = event.target.name;
    let index = event.target.id.replace("toggle", "");
    $("[name='" + name + "']").removeClass("checked");
    $("[name='" + name + "']").text("OFF");
    toggleCounter.splice($.inArray(toggleCounter[index], toggleCounter), 1);
    toggleReports.splice($.inArray(toggleReports[index], toggleReports), 1);
    $("#toggleOf" + name).text("OFF");
    $("#toggleOf" + name).removeClass("checked");
    sessionStorage.setItem("reportsSymbol", toggleReports);
    sessionStorage.setItem("reportsName", toggleCounter);
    $("#myModal").css("display", "none");
    arrayIndex--;
  });
}
// Toggle button
var arrayIndex = 0;

function toggleSwitch() {
  let toggleCounter = [];
  let toggleReports = [];

  $(".switch").click(function() {

    let id = this.id;
    let toggleId = id.replace("toggleOf", "");
    let toggleName = this.name;

    if ($(this).hasClass("checked") == false) {
    //   let id = this.id;
    //   let toggleId = id.replace("toggleOf", "");
    //   let toggleName = this.name;
      if (toggleCounter.length < 5) {
        toggleCounter.push(toggleId);
        toggleReports.push(toggleName);
        $(this).addClass("checked");
        $(this).text("ON");
        sessionStorage.setItem("reportsSymbol", toggleReports);
        sessionStorage.setItem("reportsName", toggleCounter);
      } else {
        openModal(toggleCounter, toggleReports);
      }
    } else {
    
      toggleCounter.splice(
        $.inArray(
          toggleCounter[toggleCounter.indexOf(toggleId)],
          toggleCounter
        ),
        1
      );

      
      toggleReports.splice(
        $.inArray(
          toggleReports[toggleReports.indexOf(toggleName)],
          toggleReports
        ),
        1
      );

      
      $(this).removeClass("checked");
      $(this).text("OFF");
      sessionStorage.setItem("reportsSymbol", toggleReports);
      sessionStorage.setItem("reportsName", toggleCounter);
    }
  });
}

// Display Coins

async function displayCoins() {
  try {
    let coins = await getCoins("https://api.coingecko.com/api/v3/coins/list");

    for (let i = 0; i < 1500; i++) {
      let card = "<div id='" + coins[i].symbol + "' class='card'>";
      let body =
        "<div class='card-body'><h5 class='card-title'>" +
        coins[i].symbol +
        "</h5>" +
        "<p class='card-text'>" +
        coins[i].name +
        "</p>";
      let button =
        "<a id='" +
        coins[i].id +
        "' class='btn btnBody btn-primary' data-toggle='collapse' data-target='#pop" +
        coins[i].id +
        "'>More Info</a>";
      let pop = "<div id='pop" + coins[i].id + "' class='space'></div>";
      let toggle =
        "<h6 class='toggleButtonHeader'>Show Report</h6><button class='switch toggleButton floatRight' name='" +
        coins[i].symbol +
        "' id='toggleOf" +
        coins[i].id +
        "'>OFF</button><br>";
      let cardDiv = card + body + toggle + button + pop + "</div></div>";

      $("#body").append(cardDiv);

      jQuery(".btnBody").click(function(e) {
        jQuery(".collapse").collapse("hide");
      });
    }
  } catch (error) {
    $("#body").append("Error: " + error.status);
  }
}

// Get Coins Info - Promise

async function getReports(url) {
  let reportsPromise = new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: url,
      success: function(response) {
        resolve(response);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
  return reportsPromise;
}

// Display Reports

async function displayReports() {
  let reportsSymbol = sessionStorage.getItem("reportsSymbol");


  if (reportsSymbol === null) {
    $("#chartContainer").append(
      "<p class='description center'>You didn't choose any coins for the reports yet....</p><br><div class='center'><img src='assets/images/emoji.png' width='200px;'></div>"
    );
  } else {
    let toUpperCase = reportsSymbol.toUpperCase();

    let url =
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" +
      toUpperCase +
      "&tsyms=USD";
    try {
      let coins = await getReports(url);
      if (coins.Response === "Error") {
        $("#chartContainer").empty();
        $("#chartContainer").append(
          "<p class='description center'>No information from coins</p><br><div class='center'><img src='assets/images/sorry.png' width='200px;'></div>"
        );
        return false;
      }

        
        
      let names = [];
      Object.keys(coins).map(k => { names.push(k) })
      let allCoinData = [];

    

      for (c in coins) {
        let coinData = coins[c].USD;
        allCoinData.push(coinData);
      }



      let countCoins = Object.keys(coins).length;
    

      let dataPoints0 = [];
      let dataPoints1 = [];
      let dataPoints2 = [];
      let dataPoints3 = [];
      let dataPoints4 = [];

      var chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        title: {
          text: "Coins to USD"
        },
        axisY: {
          title: "Value",
          prefix: "$",
          includeZero: false
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          verticalAlign: "top",
          fontSize: 22,
          fontColor: "dimGrey",
          itemclick: toggleDataSeries
        },
        data: [
          {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: names[0],
            dataPoints: dataPoints0
          },
          {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            showInLegend: true,
            name: names[1],
            dataPoints: dataPoints1
          },
          {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            showInLegend: true,
            name: names[2],
            dataPoints: dataPoints2
          },
          {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            showInLegend: true,
            name: names[3],
            dataPoints: dataPoints3
          },
          {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            showInLegend: true,
            name: names[4],
            dataPoints: dataPoints4
          }
        ]
      });

      function toggleDataSeries(e) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chart.render();
      }

      var updateInterval = 3000;
      // initial value

      var time = new Date();
      time.getHours();
      time.getMinutes();
      time.getSeconds();
      time.getMilliseconds();

      function updateChart() {
        for (let i = 0; i < countCoins; i++) {
          time.setTime(time.getTime() + updateInterval);

          // adding random value and rounding it to two digits.
          yValue1 = allCoinData[0];
          yValue2 = allCoinData[1];
          yValue3 = allCoinData[2];
          yValue4 = allCoinData[3];
          yValue5 = allCoinData[4];

          // pushing the new values

          if (yValue1 != undefined) {
            dataPoints0.push({
              x: time.getTime(),
              y: yValue1
            });
          }

          if (yValue2 != undefined) {
            dataPoints1.push({
              x: time.getTime(),
              y: yValue2
            });
          }

          if (yValue3 != undefined) {
            dataPoints2.push({
              x: time.getTime(),
              y: yValue3
            });
          }

          if (yValue4 != undefined) {
            dataPoints3.push({
              x: time.getTime(),
              y: yValue4
            });
          }

          if (yValue5 != undefined) {
            dataPoints4.push({
              x: time.getTime(),
              y: yValue5
            });
          }
        }

        // updating legend text with  updated with y Value

        chart.options.data[0].legendText = names[0] + " = $" + yValue1;
        chart.options.data[1].legendText = names[1] + " = $" + yValue2;
        chart.options.data[2].legendText = names[2] + " = $" + yValue3;
        chart.options.data[3].legendText = names[3] + " = $" + yValue4;
        chart.options.data[4].legendText = names[4] + " = $" + yValue5;

        chart.render();
      }
      // generates first set of dataPoints
      updateChart(100);
      setInterval(async function() {
        coins = await getReports(url);
        
        allCoinData = [];        
        for (c in coins) {
            let coinData = coins[c].USD;
            allCoinData.push(coinData);
          }      
          
        chart.options.data[0].legendText = names[0] + " = $" + yValue1;
        chart.options.data[1].legendText = names[1] + " = $" + yValue2;
        chart.options.data[2].legendText = names[2] + " = $" + yValue3;
        chart.options.data[3].legendText = names[3] + " = $" + yValue4;
        chart.options.data[4].legendText = names[4] + " = $" + yValue5;
        
        updateChart();
      }, updateInterval);

      $("#chartContainer").append(chart);
    } catch (error) {
      $("#chartContainer").empty();
      $("#chartContainer").append(
        "<p class='description'>Bad response from server</p><br><div class='center'><img src='assets/images/sorry.png' width='200px;'></div>"
      );
    }
  }
}

// Go to Top Button

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("top").style.display = "block";
  } else {
    document.getElementById("top").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Filtering
function filter() {
  $("#filter").on("keyup", function() {
    let value = $(this)
      .val()
      .toLowerCase();
    $(".card").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
}

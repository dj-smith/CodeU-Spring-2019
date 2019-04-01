/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(fetchMessageData);

/**
 * Builds a chart element and adds it to the page.
 */
function drawChart(dataTable) {
  let chart = new google.visualization.LineChart(document.getElementById('chart-container'));
  const chartOptions = {
    width: 800,
    height: 400,
    curveType: "function"
  };

  chart.draw(dataTable, chartOptions);
}

/*
 * Fetches the JSON from the /charts path and populates
 * the chart-container div in chart.html with its data.
 */
function fetchMessageData() {
  fetch("/charts")
    .then((response) => {
      return response.json();
    })
    .then((msgJson) => {
      let msgData = new google.visualization.DataTable();
      //define columns for the DataTable instance
      msgData.addColumn('date', 'Date');
      msgData.addColumn('number', 'Message Count');

      for (i = 0; i < msgJson.length; i++) {
          msgRow = [];
          let timestampAsDate = new Date(msgJson[i].timestamp);
          let totalMessages = i + 1;
          //TODO add the formatted values to msgRow array by using JS' push method
          msgRow.push(timestampAsDate, totalMessages)
          msgData.addRow(msgRow);

      }
      drawChart(msgData);
      });
}

fetchMessageData();

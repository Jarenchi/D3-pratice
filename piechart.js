const data = [5, 35, 50, 10];

const pieChartSvg = d3.select("#piechart");
const pieChartWidth = pieChartSvg.attr("width");
const pieChartHeight = pieChartSvg.attr("height");
const pieChartRadius = Math.min(pieChartWidth, pieChartHeight) / 2 - 20;
const pieChartG = pieChartSvg
  .append("g")
  .attr("transform", "translate(" + pieChartWidth / 2 + "," + pieChartHeight / 2 + ")");

//設定顏色，若數組長度多餘設定值，則會依續重複取值
const color = d3.scaleOrdinal(["#bee9e8", "#62b6cb", "#1b4965", "#cae9ff", "#5fa8d3"]);

//產生圓餅
const pie = d3.pie();

//產生圓弧
const arc = d3.arc().innerRadius(0).outerRadius(pieChartRadius);

const arcs = pieChartG.selectAll("arc").data(pie(data)).enter().append("g").attr("class", "arc");

//產生label
const label = d3
  .arc()
  .outerRadius(pieChartRadius)
  .innerRadius(pieChartRadius - 80);

//繪製色塊
arcs
  .append("path")
  .attr("fill", (i) => color(i))
  .attr("d", arc);

//將label加到圓餅上
arcs
  .append("text")
  .attr("transform", (d) => "translate(" + label.centroid(d) + ")")
  .text((d) => d.value);

// 加上標題
pieChartSvg
  .append("g")
  .attr("transform", "translate(" + (pieChartWidth / 2 - 100) + "," + 20 + ")")
  .append("text")
  .text("營收占比分配表")
  .attr("class", "title");

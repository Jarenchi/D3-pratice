const svg = d3.select("#barchart");
const margin = 200;
const width = svg.attr("width") - margin;
const height = svg.attr("height") - margin;

const xScale = d3.scaleBand().range([0, width]).padding(0.4);
const yScale = d3.scaleLinear().range([height, 0]);

const g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("./batchart.csv").then(function (data) {
  xScale.domain(data.map((d) => d.year)); //離散的年份值應設到 X 軸
  yScale.domain([0, d3.max(data, (d) => d.value)]); //y軸範圍0到最大值

  // x軸
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)) //元素加到x軸上
    .append("text")
    .attr("y", height - 250)
    .attr("x", width - 10)
    .attr("text-anchor", "end")
    .attr("fill", "gray")
    .attr("font-size", "18px")
    .text("年份");

  // y軸
  g.append("g")
    .call(
      d3
        .axisLeft(yScale)
        .tickFormat((d) => d) // 指定刻度標籤的格式
        .ticks(8) // 設定你希望在軸上有的刻度數量
        .tickSize(-width), // 設定刻度線的大小；使用負值將刻度線畫在圖表區域內
    )
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-3em")
    .attr("text-anchor", "end")
    .attr("fill", "gray")
    .attr("font-size", "18px")
    .text("營業額(億元)");

  // bars
  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.year))
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.value));
});

// 加上圖表上方標題;
svg
  .append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 50)
  .attr("y", 50)
  .attr("font-size", "24px")
  .text("Jaren公司每年營業額");

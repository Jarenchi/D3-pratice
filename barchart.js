const barcharSvg = d3.select("#barchart");
const margin = 200;
const barchartWidth = barcharSvg.attr("width") - margin;
const barcharHeight = barcharSvg.attr("height") - margin;

const xScale = d3.scaleBand().range([0, barchartWidth]).padding(0.4);
const yScale = d3.scaleLinear().range([barcharHeight, 0]);

const barchartG = barcharSvg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

async function loadData() {
  try {
    const data = await d3.csv("./batchart.csv");

    xScale.domain(data.map((d) => d.year));
    yScale.domain([0, d3.max(data, (d) => d.value)]);

    // x軸
    barchartG
      .append("g")
      .attr("transform", "translate(0," + barcharHeight + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", barcharHeight - 250)
      .attr("x", barchartWidth - 10)
      .attr("text-anchor", "end")
      .attr("fill", "gray")
      .attr("font-size", "18px")
      .text("年份");

    // y軸
    barchartG
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => d)
          .ticks(8)
          .tickSize(-barchartWidth),
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
    barchartG
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => barcharHeight - yScale(d.value));
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

loadData();

// 加上圖表上方標題;
barcharSvg
  .append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 50)
  .attr("y", 50)
  .attr("font-size", "24px")
  .text("Jaren公司每年營業額");

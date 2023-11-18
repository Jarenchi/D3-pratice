d3.select("#container")
  .selectAll("p")
  .data([1, 2, 3])
  .enter()
  .append("p")
  .text((d) => d);

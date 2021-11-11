<template>
  <!-- <svg width="500" height="270">
    <g style="transform: translate(0, 10px)">
      <path :d="line" />
    </g>
  </svg> -->
  <div id="svgcont"></div>
</template>


<script>
import * as d3 from "d3";
// const data = [99, 71, 78, 25, 36, 92];
export default {
  data() {
    return {
      data: [99, 71, 78, 25, 36, 92],
    };
  },
  mounted() {
    const svg = d3
      .select("#svgcont")
      .append("svg")
      .attr("width", 500)
      .attr("height", 270)
      .append("g")
      .attr("transform", "translate(0, 10)")
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 12)
      .attr("markerHeight", 12)
      .attr("viewBox", "0 0 12 12")
      .attr("refX", 6)
      .attr("refY", 6)
      .attr("orient", "auto");
    var arrowPath = "M2,2 L10,6 L2,10 L6,6 L2,2";
    svg.append("path").attr("d", arrowPath).attr("fill", "#2B9E64");
    svg
      .append("line")
      .attr("x1", 10)
      .attr("y1", 10)
      .attr("x2", 20)
      .attr("y2", 40)
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("marker-start", "url(#arrow)")
      .attr("marker-end", "url(#arrow)");
    var curve_path = "M20,70 T80,100 T160,80 T200,90";
    var curve = svg
      .append("path")
      .attr("d", curve_path)
      .attr("fill", "white")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("marker-start", "url(#arrow)")
      .attr("marker-mid", "url(#arrow)")
      .attr("marker-end", "url(#arrow)");
    console.log(d3, "方法");
    const x = d3.scaleLinear().range([0, 430]);
    const y = d3.scaleLinear().range([210, 0]);
    d3.axisLeft().scale(x);
    d3.axisTop().scale(y);
    x.domain(d3.extent(this.data, (d, i) => i));
    y.domain([0, d3.max(this.data, (d) => d)]);
    const createPath = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d));
    svg.append("path").attr("d", createPath(this.data));
  },
};
</script>

<style lang="sass">
svg
    margin: 25px
path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>
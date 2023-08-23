import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import subPlots from "../utils/data";
import {
  useGetCartItemsQuery,
  useAddToCartMutation,
} from "../features/cart/cartApiSlice";
import { BeatLoader } from "react-spinners";

const PlotGrid = () => {
  const chartRef = useRef();
  const [selectedSubplots, setSelectedSubplots] = useState([]);
  const [addPlot] = useAddToCartMutation();
  const { data: gridData,isLoading } = useGetCartItemsQuery();
  const plotTypes = [
    { area: 32, price: 55000 },
    { area: 24, price: 35000 },
    { area: 18, price: 25000 },
  ];

  useEffect(() => {
    const width = 600;
    const height = 400;
    const gridFactorX = 80;
    const gridFactorY = 160 / 3;
    const gridWidth = width / gridFactorX;
    const gridHeight = height / gridFactorY;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    const maxXY = d3.max(
      subPlots.flatMap((subRectVertices) =>
        subRectVertices.vertices.flatMap((vertex) => [vertex.x, vertex.y])
      )
    );

    // Calculate the scaling factors for x and y dimensions
    const xScaleFactor = width / maxXY;
    const yScaleFactor = height / maxXY;

    // Calculate the size of a grid box in terms of data units
    const gridScaledWidth = 1 / xScaleFactor;
    const gridScaledHeight = 1 / yScaleFactor;

    const xScale = d3.scaleLinear().domain([0, maxXY]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, maxXY]).range([height, 0]);

    const xGridLines = d3.range(0, maxXY, maxXY / gridFactorX);
    svg
      .selectAll(".x-grid-line")
      .data(xGridLines)
      .enter()
      .append("line")
      .attr("class", "grid-line x-grid-line")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", height)
      .style("stroke", "#ccc")
      .style("stroke-opacity", 1);

    const yGridLines = d3.range(0, maxXY, maxXY / gridFactorY);
    svg
      .selectAll(".y-grid-line")
      .data(yGridLines)
      .enter()
      .append("line")
      .attr("class", "grid-line y-grid-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .style("stroke", "#ccc")
      .style("stroke-opacity", 1);

    svg
      .append("clipPath")
      .attr("id", "chart-area")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll(".x-grid-line").attr("clip-path", "url(#chart-area)");
    svg.selectAll(".y-grid-line").attr("clip-path", "url(#chart-area)");

    subPlots.forEach(async (subRectVertices, index) => {
      const scaledVertices = subRectVertices.vertices.map((vertex) => ({
        x: xScale(vertex.x * gridWidth * gridScaledWidth),
        y: yScale(vertex.y * gridHeight * gridScaledHeight),
      }));

      const subRectPath = d3.path();
      scaledVertices.forEach((vertex, vIndex) => {
        const xPos = vertex.x;
        const yPos = vertex.y;
        if (vIndex === 0) subRectPath.moveTo(xPos, yPos);
        else subRectPath.lineTo(xPos, yPos);
      });
      subRectPath.closePath();

      const area = d3.polygonArea(
        scaledVertices.map((vertex) => [
          vertex.x / gridWidth,
          vertex.y / gridHeight,
        ])
      );

      const price = plotTypes.find((item) => item.area === Math.round(area));

      svg
        .append("path")
        .attr("d", subRectPath)
        .attr("class", `subplot-${index}`)
        .attr("id", subRectVertices.id)
        .style(
          "fill",
          
              gridData?.find(
                (item) =>
                  item.itemId === subRectVertices.id &&
                  item.area === Math.round(area)
              )
                ? "orange"
                : "#F7F7F7",
        )
        .on("click", async () => {
          if (price && price.price !== undefined) {
            await addPlot({
              itemId: subRectVertices.id,
              area: Math.round(area),
              price: price.price,
            });
          }
        });

      const minX = d3.min(scaledVertices, (vertex) => vertex.x);
      const minY = d3.min(scaledVertices, (vertex) => vertex.y);
      const maxX = d3.max(scaledVertices, (vertex) => vertex.x);
      const maxY = d3.max(scaledVertices, (vertex) => vertex.y);

      const subRectBoundary = svg
        .append("rect")
        .attr("x", minX)
        .attr("y", minY)
        .attr("width", maxX - minX)
        .attr("height", maxY - minY)
        .style("stroke", "blue")
        .style("fill", "none")
        .style("stroke-width", 1);

      svg
        .selectAll("path")
        .filter((d) => d === area)
        .style("fill", selectedSubplots.includes(area) ? "red" : "#F7F7F7");
    });

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .style("stroke", "#ddd")
      .style("fill", "none");
  }, [subPlots, selectedSubplots,gridData]);

  // const handleSubplotClick = (clickedId, area) => {
  //   console.log(area);
  //   setSelectedSubplots((prev) => {
  //     const subplotExists = prev.find(
  //       (item) => item.id === clickedId && item.area === area
  //     );

  //     if (subplotExists) {
  //       return prev.filter(
  //         (item) => item.id !== clickedId || item.area !== area
  //       );
  //     } else {
  //       return [...prev, { id: clickedId, area }];
  //     }
  //   });
  // };
  if(isLoading)<div className="flex justify-center"><BeatLoader color={"green"}/></div>

  return (
    <div
      className="flex justify-center w-full"
      style={{ backgroundColor: "#EAE8E9" }}
    >

      <svg ref={chartRef} style={{ display: "block" }}></svg>
    </div>
    
  );
};

export default PlotGrid;

import * as d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/
  const legendG = g.append('g')
    .attr('transform', 'translate(50, 200)')

  legendG.append('text')
    .text('Légende')
    .attr('font-family', 'Open Sans Condensed')
    .attr('font-size', 20)
    .attr('y', -25)

  const legend = d3Legend.legendColor()
    .scale(colorScale)
    .shape('circle')
    .shapePadding(5)
    .labelAlign('start')

  legendG.call(legend)
}

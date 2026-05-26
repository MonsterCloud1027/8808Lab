/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandler (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  // TODO : Select the squares and set their event handlers
  d3.selectAll('g.cell')
    .on('mouseenter', function (event, d) {
      rectSelected(d3.select(this), xScale, yScale)
      selectTicks(d.Arrond_Nom, d.Plantation_Year)
    })
    .on('mouseleave', function (event, d) {
      rectUnselected(d3.select(this))
      unselectTicks()
    })
}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelected (element, xScale, yScale) {
  // TODO : Display the number of trees on the selected element
  // Make sure the nimber is centered. If there are 1000 or more
  // trees, display the text in white so it contrasts with the background.
  // Lower opacity of the rectangle
  element.select('rect')
    .style('opacity', 0.75)

  const d = element.datum()
  const x = xScale.bandwidth() / 2
  const y = yScale.bandwidth() / 2
  const textColor = d.Counts >= 1000 ? 'white' : 'black'

  // Append text showing the count, centered in the rectangle
  element.append('text')
    .attr('class', 'hover-text')
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .style('fill', textColor)
    .style('font-size', '11px')
    .style('pointer-events', 'none')
    .text(d.Counts)
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselected (element) {
  // TODO : Unselect the element
  // Restore full opacity
  element.select('rect')
    .style('opacity', 1)

  // Remove the hover text
  element.select('text.hover-text')
    .remove()
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
export function selectTicks (name, year) {
  // TODO : Make the ticks bold
  // Bold the matching Y axis tick (neighborhood name)
  d3.selectAll('.y.axis .tick text')
    .filter(d => d === name)
    .style('font-weight', 'bold')

  // Bold the matching X axis tick (year)
  d3.selectAll('.x.axis .tick text')
    .filter(d => d === year)
    .style('font-weight', 'bold')
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  // TODO : Unselect the ticks
  d3.selectAll('.x.axis .tick text, .y.axis .tick text')
    .style('font-weight', 'normal')
}

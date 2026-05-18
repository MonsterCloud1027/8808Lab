
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateGroupXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  scale
    .domain(data.map(d => d.Act))
    .range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  const maxCount = d3.max(data, actData =>
    d3.max(actData.Players, d => d.Count)
  )
  scale
    .domain([0, maxCount])
    .range([height, 0])
}

/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
   // TODO : Create the groups
  d3.select('#graph-g')
    .selectAll('.act-group')
    .data(data)
    .join('g')
    .attr('class', 'act-group')
    .attr('transform', d => `translate(${x(d.Act)}, 0)`)
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars
  d3.select('#graph-g')
    .selectAll('.act-group')
    .each(function (actData) {
      d3.select(this)
        .selectAll('rect')
        .data(actData.Players)
        .join('rect')
        .attr('x', d => xSubgroup(d.Player))
        .attr('y', d => y(d.Count))
        .attr('width', xSubgroup.bandwidth())
        .attr('height', d => height - y(d.Count))
        .attr('fill', d => color(d.Player))
        .on('mouseover', function (event, d) {
          tip.show(d, this)
        })
        .on('mouseout', function () {
          tip.hide()
        })
    })
}

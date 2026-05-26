/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  // TODO: Return the neihborhood names

  return [...new Set(data.map(d => d.Arrond_Nom))].filter(name => name)
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {
  // TODO : Filter the data by years
  return data.filter(d => {
    const year = d.Date_Plantation instanceof Date
      ? d.Date_Plantation.getFullYear()
      : new Date(d.Date_Plantation).getFullYear()
    return year >= start && year <= end
  })
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  // TODO : Construct the required data table
  const counts = {}

  data.forEach(d => {
    const neighborhood = d.Arrond_Nom
    // d3.autoType a déjà converti la date en objet Date
    const year = d.Date_Plantation instanceof Date
      ? d.Date_Plantation.getFullYear()
      : new Date(d.Date_Plantation).getFullYear()
    const key = `${neighborhood}_${year}`

    if (!counts[key]) {
      counts[key] = { Arrond_Nom: neighborhood, Plantation_Year: year, Counts: 0 }
    }
    counts[key].Counts++
  })

  return Object.values(counts)
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  // TODO : Find missing data and fill with 0
  const years = range(start, end)
  const filled = [...data]

  neighborhoods.forEach(neighborhood => {
    years.forEach(year => {
      const exists = data.some(
        d => d.Arrond_Nom === neighborhood && d.Plantation_Year === year
      )
      if (!exists) {
        filled.push({ Arrond_Nom: neighborhood, Plantation_Year: year, Counts: 0 })
      }
    })
  })

  return filled
}

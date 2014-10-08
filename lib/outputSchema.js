
/* 
  default schema: poi_name, (local_admin || locality || neighborhood || admin2), (admin1_abbr || admin1)
  
  eg keys:
  "alpha3": "USA",
  "admin0": "United States",
  "admin1": "New York",
  "admin1_abbr": "NY",
  "admin2": "New York",
  "local_admin": "Manhattan",
  "locality": "New York",
  "neighborhood": "Marble Hill"
*/

var outputSchema = {
  'United States': {
    local: ['local_admin', 'locality', 'neighborhood', 'admin2'],
    regional: ['admin1_abbr', 'admin1', 'admin0']
  },
  'United Kingdom': {
    local: ['neighborhood', 'local_admin', 'locality', 'admin2'],
    regional: ['admin1_abbr', 'admin1', 'admin0']
  },
  'default': {
    local: ['local_admin', 'locality', 'neighborhood', 'admin2'],
    regional: ['admin1_abbr', 'admin1', 'admin0']
  }
}

module.exports = outputSchema; 
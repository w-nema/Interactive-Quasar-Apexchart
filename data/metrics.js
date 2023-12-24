
export const metrics = {
  schema: {
    aggs: { //time aggregates
      label: 'Time Aggregates',
      description: 'Stats for period counting backward from today',
      flags: [
        { value:  "dy", label: '1 Day ago' },
        { value:  "wk", label: '1 Week ago' },
        { value:  "mo", label: '1 Month ago' },
        { value:  "qr", label: '1 Quarter ago' },
        { value:  "yr", label: '1 Year ago'},
        { value: "all", label: 'ALL data'}
      ]
    },
    cats: { //the measured
      label: 'Measured Object',
      description: 'What is measured; becomes the chart x-axis',
      flags: [
        //{ value: "mo100", label: 'Usage'               , path:'/usage'               },
        { value: "mo101", label: 'User', path: '/usage/user' },
        { value: "mo102", label: 'Anonymous Users', path: '/usage/user/anon' },
        { value: "mo103", label: 'Authenticated Users', path: '/usage/user/auth' },
        { value: "mo104", label: 'Paying Users', path: '/usage/user/paid' },
        //{ value: "mo105", label: 'Content'             , path:'/content'             },
        { value: "mo106", label: 'General Knowledge', path: '/content/topic/genKn' },
        { value: "mo107", label: 'Books', path: '/content/book' },
        { value: "mo108", label: 'MOOCs', path: '/content/mooc' },
        { value: "mo109", label: 'Certifications', path: '/content/cert' },
        { value: "mo110", label: 'Standardized Tests', path: '/content/stdTest' },
        { value: "mo111", label: 'Edu', path: '/content/edu' }
      ]
    },
    metrics: { //the measure
      label: 'Metrics',
      description: 'Measure',
      flags: [
        {
          value: 'exists',
          label: 'Total Count',
          description: 'Total count in the system of Measured Object'
        },
        {
          value: 'visits',
          label: 'Visit Count',
          description: 'Number of times Measured Object got accessed'
        },
        {
          value: 'interactions',
          label: 'Interactions Count',
          description: 'Number of times Measured Object got user interactions; e.g. grading, rating, annotation, etc.'
        },
        {
          value: 'duration',
          label: 'Interaction Duration in minutes',
          description: 'Number of minutes users spent on Measured Object'
        }
      ]
    }
  },
  data: { //format: cat_metric: [dy, wk, mo, qr, yr, all]; each entry below becomes a yaxis data series
    "mo101_exists": [40, 35, 30, 25, 20, 15],
    "mo102_exists": [35, 30, 25, 20, 15, 15],
    "mo103_exists": [6, 7, 6, 7, 7, 5],
    "mo104_exists": [12, 13, 12, 14, 14, 10],
    "mo106_exists": [13, 13, 13, 13, 13, 12],
    "mo107_exists": [50, 40, 30, 20, 10, 9],
    "mo108_exists": [42, 37, 32, 27, 22, 21],
    "mo109_exists": [21, 20, 23, 27, 30, 29],
    "mo110_exists": [10, 9, 8, 7, 6, 5],
    "mo111_exists": [34, 35, 29, 17, 15, 14],
    "mo101_visits": [77, 75, 57, 63, 44, 33],
    "mo102_visits": [70, 65, 60, 55, 50, 45],
    "mo103_visits": [65, 60, 55, 50, 45, 40],
    "mo104_visits": [59, 55, 51, 47, 43, 39],
    "mo106_visits": [13, 13, 13, 13, 13, 12],
    "mo107_visits": [50, 40, 30, 20, 10, 9],
    "mo108_visits": [42, 37, 32, 27, 22, 21],
    "mo109_visits": [21, 20, 23, 27, 30, 29],
    "mo110_visits": [10, 9, 8, 7, 6, 5],
    "mo111_visits": [34, 35, 29, 17, 15, 14],
    "mo101_repeatVisits": [31, 35, 22, 52, 52, 6],
    "mo102_repeatVisits": [61, 42, 82, 63, 60, 95],
    "mo103_repeatVisits": [57, 37, 30, 55, 5, 87],
    "mo104_repeatVisits": [51, 35, 90, 21, 81, 40],
    "mo106_repeatVisits": [63, 51, 95, 42, 8, 48],
    "mo107_repeatVisits": [37, 67, 95, 43, 83, 95],
    "mo108_repeatVisits": [68, 19, 9, 8, 63, 89],
    "mo109_repeatVisits": [20, 63, 64, 9, 94, 1],
    "mo110_repeatVisits": [93, 33, 29, 97, 58, 54],
    "mo111_repeatVisits": [39, 19, 40, 79, 96, 23],
    "mo101_interactions": [42, 19, 8, 87, 13, 53],
    "mo102_interactions": [56, 91, 13, 77, 56, 36],
    "mo103_interactions": [27, 54, 39, 31, 2, 22],
    "mo104_interactions": [70, 45, 41, 54, 14, 63],
    "mo106_interactions": [3, 4, 5, 7, 10, 9],
    "mo107_interactions": [37, 32, 16, 4, 2, 1],
    "mo108_interactions": [34, 28, 24, 19, 14, 13],
    "mo109_interactions": [10, 9, 14, 15, 20, 19],
    "mo110_interactions": [7, 6, 5, 4, 3, 2],
    "mo111_interactions": [30, 29, 24, 8, 4, 3],
    "mo101_duration": [56, 26, 50, 37, 65, 70],
    "mo102_duration": [62, 55, 37, 76, 39, 55],
    "mo103_duration": [13, 99, 96, 4, 85, 19],
    "mo104_duration": [36, 63, 17, 61, 30, 0],
    "mo106_duration": [72, 2, 88, 3, 41, 15],
    "mo107_duration": [63, 37, 52, 60, 87, 20],
    "mo108_duration": [59, 55, 60, 79, 81, 65],
    "mo109_duration": [65, 57, 57, 76, 57, 32],
    "mo110_duration": [20, 8, 79, 54, 89, 38],
    "mo111_duration": [14, 58, 91, 20, 7, 58]
  }
}

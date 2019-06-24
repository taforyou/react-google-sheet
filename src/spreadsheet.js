import config from "./config";
/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A4:H"
      })
      .then(
        response => {
          const data = response.result.values;

          // ต่างกันยังไงนิ ?
          //console.log(data);

          const stocks = data.map(
            stock =>
              ({
                name: stock[0],
                closeprice: stock[4]
              } || [])
          );

          callback({ stocks });

          //   const cars =
          //     data.map(car => ({
          //       year: car[0],
          //       make: car[1],
          //       model: car[2]
          //     })) || [];
          //   callback({
          //     cars
          //   });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

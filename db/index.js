const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/home/ubuntu/locationService/db/hotels', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("Could not connect to Database: ", err);
  } else {
  console.log("Connected to the database."); }
});

var getInfoById = (obj, callback) => {

      db.all("SELECT * FROM data where id=(?)", [obj.hotelID],(err, result) => {
         callback(err, result); 
      });
}

module.exports = {
  getInfoById
}


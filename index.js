var copy = require("copy-dynamodb-table").copy;
var fs = require("fs");

var data = JSON.parse(fs.readFileSync("tables.tx", "utf-8"));
for (let element in data.TableNames) {
  let tableName = data.TableNames[element];

  copy(
    {
      source: {
        tableName: tableName,
        config: { region: "ap-south-1" }, // required
      },
      destination: {
        tableName: tableName,
        config: { region: "us-east-2" }, // required
      },
      log: true, // default false
      create: true, // create destination table if not exist
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
}

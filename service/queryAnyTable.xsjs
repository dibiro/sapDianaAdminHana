try
{
    var content = $.request.body.asString();
    var {schema, table} = JSON.parse(content)
    var conn = $.hdb.getConnection();
    var resultSet = conn.executeQuery('SELECT * FROM '+schema+'.'+table);
    var columnsMetadata = resultSet.metadata.columns;
    var columnCount = columnsMetadata.length;
    var body = {};
    var keys = [];
    var records = [];
    var record = {};

    for(var i = 0; i < columnCount; i++) {
        keys.push({
            "name": columnsMetadata[i].name,
            "typeName": columnsMetadata[i].typeName,
            "isNull": columnsMetadata[i].isNutable,
        });
    }
    var iterator = resultSet.getIterator();
    var totalPrice = 0;
    for (var row in resultSet) {
        records.push(resultSet[row])
    }
    body['keys'] = keys;
    body['records'] = records;
    $.response.contentType = "text/plain";
    $.response.setBody(JSON.stringify(body));
}
catch(err)
{
    var response = {"message": err.message, "error":true}
    $.trace.error("Error upload: "+err.message);
    $.response.setBody(JSON.stringify(response));
}
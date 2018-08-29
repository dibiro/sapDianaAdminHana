try
{
    var content = $.request.body.asString();
    var {schema, table, pk} = JSON.parse(content)
    var conn = $.hdb.getConnection();
    var resultSet = conn.executeQuery('SELECT * FROM '+schema+'.'+table);
    var columnsMetadata = resultSet.metadata.columns;
    var columnCount = columnsMetadata.length;
    var keys = [];
    var records = [];
    var record = {};

    var conn = $.db.getConnection();
    var pstmt = conn.prepareStatement( "insert into SAP_DIANA_ADMIN.\"TABLES\" (name, schema_name, create_date, type, pk) values(?,?,?,?,?)" );
    
    var d = new Date();
    pstmt.setString(1, table);
    pstmt.setString(2, schema);
    pstmt.setString(3, d.toISOString());
    pstmt.setString(4, '');
    pstmt.setString(5, pk);
    pstmt.addBatch();
    pstmt.executeBatch();
    pstmt.close();
    var response = {"message": "Done", "error":false}
    $.response.contentType = "text/plain";
    $.response.setBody(JSON.stringify(response));
}
catch(err)
{
    var response = {"message": err.message, "error":true}
    $.trace.error("Error upload: "+err.message);
    $.response.setBody(JSON.stringify(response));
}
try
{
    var content = $.request.body.asString();
    var {schema} = JSON.parse(content)
    var conn = $.hdb.getConnection();
    var resultSet = conn.executeQuery('create table '+schema+'.PRUEBA_LEOPOLDO_ESPERO_NO_SEAN_TAN_MALOS (ID BIGINT ,name nvarchar(200),PRIMARY KEY (ID));');
    resultSet = conn.executeQuery('drop table '+schema+'.PRUEBA_LEOPOLDO_ESPERO_NO_SEAN_TAN_MALOS');

    var conn = $.db.getConnection();
    var pstmt = conn.prepareStatement( "insert into SAP_LEOPOLDO.\"SCHEMA_TABLE\" (name) values(?)" );
    
    pstmt.setString(1, schema);
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
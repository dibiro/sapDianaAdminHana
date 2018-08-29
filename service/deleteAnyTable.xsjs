$.response.headers.set("Access-Control-Allow-Origin", "*");
$.response.status = $.net.http.OK;
$.response.contentType = "text/html";
var response = {"error": false, "message": "Done"};
try
{
    var content = $.request.body.asString();
    var {name, schema, pk} = JSON.parse(content);
    var conn = $.db.getConnection();

    var deleteRecord = 'DELETE FROM '+schema+'.'+name+' WHERE ' + pk.name + '=' + pk.value

    var pstmtCreate = conn.prepareStatement( deleteRecord );
    pstmtCreate.addBatch();
    pstmtCreate.executeBatch();
    pstmtCreate.close();
    
    conn.commit();
    conn.close();
    $.response.setBody(JSON.stringify(response));
}
catch(err)
{
    response.message = err.message
    $.trace.error("Error upload: "+err.message);
    $.response.setBody(JSON.stringify(response));
}
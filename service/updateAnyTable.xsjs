$.response.headers.set("Access-Control-Allow-Origin", "*");
$.response.status = $.net.http.OK;
$.response.contentType = "text/html";
var response = {"error": false, "message": "Done"};
try
{
    var content = $.request.body.asString();
    var {keys, name, schema, pk} = JSON.parse(content);
    var conn = $.db.getConnection();
    var keysText = ''
    var numVar = ''
    var newTable = 'update '+schema+'.'+name+' set '
    for (var i = 0; i < keys.length; i++) {
        newTable = newTable + keys[i].name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "_") +'=?'
        if ((i+1) < keys.length) {
            newTable = newTable + ', '
            numVar = numVar + ','
        }
    };
    newTable = newTable + " where " + pk.name + "=" + pk.value

    var pstmtCreate = conn.prepareStatement( newTable );
    for (var j = 0; j < keys.length; j++) {
        pstmtCreate.setString(1+j ,keys[j].value);
    }
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
const appInsights = require("applicationinsights");
appInsights.setup().start();
const client = appInsights.defaultClient;

module.exports = async function (context) {
    context.bindings.outputBlob = "testing";

    // Scheduling - Send notification 5 minutes before
    var random = Math.random()*10;
    random =  Math.round(random);
    //instead of generate and string I want that the url show the rand-giud name generated for the blob
    var string1 = Math.random().toString(36).substring(2);
    
    try {
        await axios.get("https://dacrookmonitorweb.azurewebsites.net/Todos/RandomMetric/" + random + "?" + "blobName=" + string1 + ".txt&" + "correlationId=" + context.invocationId);
        context.log('request successful');
    }
    catch(ex) {
        context.log('request failed');
    }

    context.log("https://dacrookmonitorweb.azurewebsites.net/Todos/RandomMetric/" + random + "?" + "blobName=" + string1 + ".txt&" + "correlationId=" +  context.invocationId)
    client.trackEvent({name: "FunctionBlobMaker", properties: {blobName: string1, correlationId: context.invocationId}});
    
    context.done();
};
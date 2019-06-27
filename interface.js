const adpInterface = {
    getEndpoint: {
        proxy: "http://swgscan.wakefern.com:8080",
        url: "https://interview.adpeai.com/api/v1/get-task",
    },
    postEndpoint: {
        proxy: "",
        url: "https://interview.adpeai.com/api/v1/submit-task"
    },
    get: async () => {
        await request(adpInterface.getEndpoint, (err, res, body) => {
            if(err) {
                console.log(`Error getting new task ${err}`);
                reject(err)
            }
            resolve(body);
        });
    },
    post: async (taskResponse) => {
        const options = {
            url:adpInterface.postEndpoint.url, 
            proxy: adpInterface.postEndpoint.proxy, //how to make this conditional...
            body:taskResponse, 
            json: true
        }
        await request.post(options, (err, res, body) => {
            if(err) {
                console.log('Submit task failed', err);
                console.log(`Body ${body} and response ${res}`)
                reject(err); //so that Training mode can pause instead of failing
            }
            resolve(true);
        })
    
    }
};

module.exports = adpInterface;
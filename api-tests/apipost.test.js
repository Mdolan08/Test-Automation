const axios = require('axios');
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  
axios.defaults.validateStatus = () => true;

test('apiTest', async () => {
    const randomId = getRandomInt(10000);
    // create new data
    const postResponce = await axios({
        method: 'post',
        url: 'http://localhost:3000/posts',
        data: {
            'id': randomId,
            'title': 'json-server',
            'author': 'typicode'
        }    
    });
    expect(postResponce.status).toBe(201); 
    // make put call
    const putResponce = await axios({ 
        method: 'put',
        url: `http://localhost:3000/posts/${randomId}`,
        data:{
            'id': randomId,
            'title': 'json-server',
            'author': 'default'
        }
    });
    // check get status
    expect(putResponce.status).toBe(200); 
    // make get call
    const getResponce = await axios({ 
        method: 'get',
        url: `http://localhost:3000/posts/${randomId}`
    });
    // check get status
    expect(getResponce.status).toBe(200);  
    // check get Response properties
    expect(getResponce.data.author).toBe('default');
    // delete the new data
    const res = await axios.delete(`http://localhost:3000/posts/${randomId}`);
    // check get responce 
    expect(res.status).toBe(200);
    const getResponceAfterDelete = await axios({ 
        method: 'get',
        url: `http://localhost:3000/posts/${randomId}`
    });
    // check get status after delete
    expect(getResponceAfterDelete.status).toBe(404); 
});



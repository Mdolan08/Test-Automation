const axios = require('axios');

test('GetDataCatFacts', async () => {
    const responce = await axios({ 
        method: 'get',
        url: 'https://catfact.ninja/fact'
    });
    expect(responce.status).toBe(200);  
    expect(responce.data.fact).toBeTruthy(); 
});

test('GetDataBoredApe', async () => {
    const responce = await axios({ 
        method: 'get',
        url: 'https://www.boredapi.com/api/activity'
    }); 
    expect(responce.status).toBe(200);  
    expect(responce.data.activity).toBeTruthy();
    expect(responce.config.url).toBe('https://www.boredapi.com/api/activity');
});


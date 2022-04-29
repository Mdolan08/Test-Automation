const axios = require('axios');
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}  
axios.defaults.validateStatus = () => true;

test('commentTests', async () => {
    const randomId = getRandomInt(10000);
    //create a post
    const postComment = await axios({
        method: 'post',
        url: 'http://localhost:3000/posts',
        data: {
            'id': randomId,
            'title': 'json-server',
            'author': 'typicode'
        }    
    });     
    //check if post was succesful
    expect(postComment.status).toBe(201);
    //post Comment
    const addComment = await axios({
        method: 'post',
        url: `http://localhost:3000/posts/${randomId}/comments/`,
        data: {
            'id': randomId,
            'body': 'Here is my comment',
            'postId': randomId
        }
    }); 
    //check if post was successful
    expect(addComment.status).toBe(201);
    //create a get to verify the comment info
    const getComment = await axios({ 
        method: 'get',
        url: `http://localhost:3000/posts/${randomId}/comments`
    });  
    // check get status
    expect(getComment.status).toBe(200);
    //verify the data in the comment is correct
    expect(getComment.data[0].body).toBe('Here is my comment');
    //add two more comments
    //post Comment
    const randomIdFL = getRandomInt(10000);
    const addCommentFL = await axios({
        method: 'post',
        url: `http://localhost:3000/posts/${randomId}/comments/`,
        data: {
            'id': randomIdFL,
            'body': 'Hello from Florida - Grandpa',
            'postId': randomIdFL
        }
    }); 
    //check if post was successful
    expect(addCommentFL.status).toBe(201);
    //post Comment
    const randomIdOR = getRandomInt(10000);
    const addCommentOR = await axios({
        method: 'post',
        url: `http://localhost:3000/posts/${randomId}/comments/`,
        data: {
            'id': randomIdOR,
            'body': 'Oregon is beautiful',
            'postId': randomIdOR
        }
    }); 
    //check if post was successful
    expect(addCommentOR.status).toBe(201);
    //create a get to verify the comment info
    const getAllComments = await axios({ 
        method: 'get',
        url: `http://localhost:3000/posts/${randomId}/comments`
    });  
    // check get status
    expect(getAllComments.status).toBe(200);
    //Assert the amount of comments
    expect(getAllComments.data.length).toBe(3);
    //validate the unique data in each comment
    expect(getAllComments.data[0].body).toBe('Here is my comment');
    expect(getAllComments.data[1].body).toBe('Hello from Florida - Grandpa');
    expect(getAllComments.data[2].body).toBe('Oregon is beautiful');
});



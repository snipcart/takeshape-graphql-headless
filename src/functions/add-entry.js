
import fetch from 'node-fetch';

const { TAKESHAPE_API_KEY, TAKESHAPE_PROJECT_ID } = process.env;

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const body = {
        query: `
        mutation {
            createEntry(input: {
              message: "${requestBody.message}",
              _enabled:false
            }) {
              clientMutationId
            }
          }
        `
    };
    
    return fetch(`https://api.takeshape.io/project/${TAKESHAPE_PROJECT_ID}/graphql`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${TAKESHAPE_API_KEY}` 
        },
    })
    .then((response) => {
        return {
            statusCode: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(requestBody)
        }
    })
    .catch((error) => {
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    });
}
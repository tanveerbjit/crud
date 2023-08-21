
module.exports = async function getPostData(req) {
  try {
    let body = "";

    for await (const chunk of req) {
      body += chunk.toString();
    }

    return JSON.parse(body);

  } catch (error) {

    throw error;
    
  }
}


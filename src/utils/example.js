import axios from "axios";

async function uploadArticle(endpoint, object) {
  try {
    const data = JSON.stringify(object);

    const response = await axios({
      method: "post",
      url: endpoint,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    });

    console.log(response.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

uploadArticle("https://pwd-arseed.herokuapp.com/arseed", {"content": "hello world"});

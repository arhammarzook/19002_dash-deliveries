const api_url="https://retoolapi.dev/AnbI2N/data";

initialise_data()

async function initialise_data() {
  // Our basis for checking whether our API url is newly generated is if it has an item with ID 1 (the dummy data generated by the tool)

  // Storing response
  const response = await fetch(api_url);

  // Storing data in form of JSON
  var data = await response.json();

  var has_dummy_data = data.some(function(item){ return item.id == 1});

  if(has_dummy_data) {
    for (var item of data_setup) {
      console.log(item)
      await fetch(api_url, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
    }

    // Remove the dummy data
    remove(1)
  }
}


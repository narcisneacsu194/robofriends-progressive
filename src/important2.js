const urls = [
  "https://swapi.co/api/people/1",
  "https://swapi.co/api/people/2",
  "https://swapi.co/api/people/3",
  "https://swapi.co/api/people/4"
];

Promise.all(
  urls.map(url => {
    return fetch(url).then(people => {
      console.log("People: ", people);
      console.log("People json: ", people.json());
      return people.json();
    });
  })
)
  .then(array => {
    //   throw Error;
    console.log("1", array[0]);
    console.log("2", array[1]);
    console.log("3", array[2]);
    console.log("4", array[3]);
  })
  .catch(err => console.log("ughhh fix it!", err))
  .finally(data => console.log("extra"));

const loopThroughUrls = urls => {
  for (url of urls) {
    console.log(url);
  }
};

const getData2 = async function() {
  const arrayOfPromises = urls.map(url => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
};

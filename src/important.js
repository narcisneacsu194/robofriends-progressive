const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("Stuff Worked");
  } else {
    reject("Error, it broke");
  }
});

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

Promise.all(
  urls.map(url => {
    return fetch(url).then(resp => resp.json());
  })
)
  .then(results => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch(err => console.log("error!!!"));

console.log("I am first");

const getData = async function() {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(url => {
        return fetch(url).then(resp => resp.json());
      })
    );

    console.log("users", users);
    console.log("posts", posts);
    console.log("albums", albums);
  } catch (err) {
    console.log("oops", err);
  }
};

const getData2 = async function() {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async url => {
        const response = await fetch(url);
        return response.json();
      })
    );

    console.log("users", users);
    console.log("posts", posts);
    console.log("albums", albums);
  } catch (err) {
    console.log("oops", err);
  }
};

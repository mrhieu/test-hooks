function doNothing() {
  let data = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      name: 'User ' + 1
    })
  }

  return data;
}

console.log(doNothing()); // eslint-disable-line

let Grace = {
  name: "Grace",
  age: 26,
};
function profile(country, height, weight) {
  return (
    this.name +
    " is form " +
    country +
    " ,height is " +
    height +
    ", and weight is " +
    weight
  );
}

console.log(profile.apply(Grace, ["USA", 160, 40]));

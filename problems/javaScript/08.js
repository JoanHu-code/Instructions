const languages = [
  { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
  { name: "Java", rating: 9.4, popularity: 8.5, trending: "hot" },
  { name: "C++", rating: 9.2, popularity: 7.7, trending: "hot" },
  { name: "PHP", rating: 9.0, popularity: 5.7, trending: "decreasing" },
  { name: "JS", rating: 8.5, popularity: 8.7, trending: "hot" },
];
let result = languages.every((lang) => lang.rating >= 9.2);
console.log(result); //fasle
result = languages.every((lang) => lang.popularity > 8.0);
console.log(result); //false
result = languages.every((lang) => lang.popularity > 5.0);
console.log(result); //true

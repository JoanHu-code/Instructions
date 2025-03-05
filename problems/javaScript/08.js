class Circle {
  static allCircles = [];

  constructor(radius) {
    this.radius = radius;
    Circle.allCircles.push(this);
  }
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }

  static getAreaFormula() {
    return "pi*r*r";
  }

  static getAllCirclesAreaTotal() {
    let total = 0;
    Circle.allCircles.forEach((circle) => {
      total += Math.PI * circle.radius * circle.radius;
    });
    return total;
  }
}
let c1 = new Circle(10);
let c2 = new Circle(5);
let c3 = new Circle(3);
console.log(c1.getArea());
console.log(c2.getArea());
console.log(c3.getArea());
console.log(Circle.getAreaFormula());
console.log(Circle.getAllCirclesAreaTotal());

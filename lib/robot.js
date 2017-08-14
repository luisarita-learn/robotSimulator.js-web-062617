'use strict';

const Robot = (function Robot() {
  return class Robot {
    constructor() {
    }

    orient(direction) {
      if (this.constructor.validDirections().includes(direction)) {
        this.bearing = direction
      } else {
        throw Error("Invalid Robot Bearing")
      }
    }

    turnRight(){
      let newIndex = this.constructor.validDirections().indexOf(this.bearing) + 1;
      if (newIndex === 4) {
        newIndex = 0;
      }
      this.bearing = this.constructor.validDirections()[newIndex];
    }

    turnLeft() {
      let newIndex = this.constructor.validDirections().indexOf(this.bearing) -1;
      if (newIndex === -1) {
        newIndex = 3;
      }
      this.bearing = this.constructor.validDirections()[newIndex];
    }

    at(x, y) {
      this.coordinates = [x,y]
    }

    advance () {
      if (this.bearing === 'north'){
        this.coordinates[1] += 1
      } else if (this.bearing === 'east') {
        this.coordinates[0] += 1
      } else if (this.bearing === 'south') {
        this.coordinates[1] -= 1
      } else {
        this.coordinates[0] -= 1
      }
    }

    methods (steps) {
      let conversions = [];
      conversions["L"] = this.turnLeft
      conversions["R"] = this.turnRight
      conversions["A"] = this.advance
      let methods = [];
      steps.split("").forEach(function (letter) {
        methods.push(conversions[letter]);
      })
      return methods;
    }

    instructions(steps) {
      let methodNames = [];
      this.methods(steps).forEach(function (method) {
        methodNames.push(method.name)
      })
      return methodNames;
    }

    place (setUp){
      this.at(setUp.x, setUp.y)
      this.orient(setUp.direction)
    }

    evaluate (steps) {
      let methods = this.methods(steps);
      methods.forEach( function (method){
        let action = method.bind(this)
        action();
      }, this);
    }

    static validDirections() {
      return [ 'north', 'east', 'south', 'west' ];
    }

  }
})();

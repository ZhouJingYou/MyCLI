class Creator {
  constructor(name, target) {
    this.name = name
    this.target = target
  }
  create() {
    console.log("this.name :>> ", this.name)
    console.log("this.target :>> ", this.target)
  }
}
module.exports = Creator

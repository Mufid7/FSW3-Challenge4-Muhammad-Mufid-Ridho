class App {
  constructor() {
    this.carContainerElement = document.getElementById('cars-container')
    this.buttonCari = document.getElementById('cari-mobil')
  }

  async init() {
    await this.load()
    this.buttonCari.onclick = this.run
  }

  run = () => {
    let capacityCar = document.getElementById('qty').value
    let dateCari = document.getElementById('date').value
    let timeCari = document.getElementById('time').value
    let driver = document.getElementById('driver').value

    let newDate = new Date(`${dateCari}T${timeCari}Z`)
    if (
      capacityCar === '' ||
      dateCari === '' ||
      timeCari === '' ||
      driver === ''
    ) {
      alert('Isi semua form terlebih dahulu')
    } else {
      this.clear()
      Car.list.forEach((car) => {
        if (
          car.capacity >= capacityCar &&
          car.availableAt > newDate &&
          car.available === true
        ) {
          const node = document.createElement('div')
          // console.log(car.capacity)
          node.innerHTML = car.render()
          this.carContainerElement.append(node)
        }
      })
    }
  }

  async load() {
    const cars = await Binar.listCars()
    Car.init(cars)
    // this.filter(date, cap)
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild

    while (child) {
      child.remove()
      child = this.carContainerElement.firstElementChild
    }
  }
}

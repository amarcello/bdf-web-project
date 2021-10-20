'use stric';

class FactCounter {
  constructor() {
    // Get all the Facts from the page
    this.facts = document.querySelectorAll('.fact');
    this.speed = 30;
    this.init();
  }

  init() {
    // If there are no facts, return immediately
    if (!this.facts) return;

    this.facts.forEach(fact => this.updateCounter(fact));
  }

  updateCounter(fact) {
    // Extract the counter (total number) and unit from the fact data attributes
    const { counter, counterUnit } = fact.dataset;

    // Element to render the updated counter
    const factCounter = fact.querySelector('.fact-counter');

    // Convert counter from string to number
    const target = +counter;

    // Calculate the increment based on the speed, then increase the count
    const increment = Math.trunc(target / this.speed);
    const count = +factCounter.innerText + increment;

    // If the counter is below the target, proceed increasing
    if (count < target) {
      factCounter.innerText = count;
      setTimeout(() => this.updateCounter(fact), this.speed);
    }
    // If the counter reaches the target, finish it adding the unit to the number
    else {
      factCounter.innerText = [target, counterUnit].join('');
    }
  }
}

export default FactCounter;

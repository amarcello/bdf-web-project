'use strict';

class SimpleData {
  constructor(collection) {
    // Set the API database URL based on the collection passed by
    this.api_url = `https://bdf-project-329421-default-rtdb.firebaseio.com/${collection}.json`;
  }

  async getData() {
    // Try processing the request
    try {
      const request = await fetch(this.api_url);

      // If request isn't successful, throw error
      if (!request.ok) throw new Error('Error fetching data, try again!');

      // If request is successful, return data
      const data = await request.json();
      return data;
    } catch (err) {
      // (In a real world scenario, here we'd have a proper error handling instead of just displaying a console error message)
      console.error(err);
    }
  }
}

export default SimpleData;

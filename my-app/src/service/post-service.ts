import { HttpClient, json } from 'aurelia-fetch-client';

export class PostService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
        mode: 'cors',
        credentials: 'include',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'mode' : 'no-cors',
          },
      })
    });
  }

  async getEmployeeData(): Promise<any> {
    try {
      const response = await this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async createEmployeeData(data: {title: string, body: string}): Promise<any> {
    try {
      console.log('data ', data);
      const response = await this.httpClient.post('https://jsonplaceholder.typicode.com/posts', {
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  }
}

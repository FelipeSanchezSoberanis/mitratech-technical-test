import axios from "axios";

const BASE_URL = "http://localhost:9000";

export interface Widget {
  description: string;
  name: string;
  price: number;
}

export const fetchAllWidgets = (): Promise<Widget[]> =>
  axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data);

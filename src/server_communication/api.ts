import MedicationData from "../models/MedicationData";
import * as endpoints from "../endpoints";

class API {
	private static paramsToQueryString(params: Object) {
		//@ts-ignore
		return Object.keys(params).map(key => key + '=' + params[key]).join('&');
	}

	private static async request<T>(endpoint: string, params: Object): Promise<T> {
		const response: Response = await fetch(endpoint + this.paramsToQueryString(params));

    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return Promise.reject(new Error(response.statusText));
    }
	}
  public static async getMedication(code: string): Promise<MedicationData> {
    return this.request(endpoints.getMedication, {code: code})
  }

  public static async isLasa(code: string): Promise<boolean> {
    return this.request(endpoints.isLasa, {code: code})
  }
}

export default API;

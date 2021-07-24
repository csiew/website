import axios from "axios";

class ApiRepository {
  constructor(hostname, port) {
    this.hostname = hostname;
    this.port = port;
  }

  getHostname() {
    return this.hostname;
  }

  getPort() {
    return this.port;
  }

  setHostname(hostname) {
    this.hostname = hostname;
  }

  setPort(port) {
    this.port = port;
  }

  url() {
    return `${this.hostname}${this.port ? ':' + this.port : ''}`;
  }

  generateUrlParams(urlParams={}) {
    if (Object.keys(urlParams).length === 0) {
      return "";
    }
    let result = "";
    let firstParamFilled = false;
    for (const [key, value] of Object.entries(urlParams)) {
      result = result.concat(firstParamFilled ? "&" : "?").concat(`${key}=${value}`);
      firstParamFilled = true;
    }
    return result;
  }

  get(endpointUrl, urlParams) {
    let requestUrl = this.url() + endpointUrl + this.generateUrlParams(urlParams);
    return axios.get(requestUrl);
  }
}

export default ApiRepository;

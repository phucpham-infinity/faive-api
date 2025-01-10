import {parse as parseUrl} from "node:url";
import {tlds_regex} from "../helpers/tlds.js";

class UrlParser {
  constructor(url, data) {
    this.url = url
    this.data = data
  }

  static make(...args) {
    return new UrlParser(...args)
  }

  getSiteName() {
    const url = parseUrl(this.url);
    let name = this.removeTld(url.hostname);
    name = name.split('.').reverse()[0];
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  removeTld(domain){
    for ( const regex of tlds_regex ){
      if( domain.match(regex) ){
        return domain.replace(regex, '');
      }
    }
    return domain;
  }

  getRootUrl() {
    const url = parseUrl(this.url);
    return (url.protocol ?? 'http:') + '//' + url.hostname + (url.port ? `:${url.port}` : '');
  }
}

export default UrlParser

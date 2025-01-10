import UrlParser from "./utils/urlParser.js";

const parser = UrlParser.make('https://google.com');
console.log(parser.getRootUrl());
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// LicenseManager.setLicenseKey('SHI_International_Corp._on_behalf_of_JPMorgan_Chase_-_Credit_Navigator_3Devs20_June_2018__MTUyOTQ0OTIwMDAwMA==db2483288b59b6907b2eb57f0d621d99');
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

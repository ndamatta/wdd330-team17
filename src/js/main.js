import Alert from "./alert.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

/*
ALERT FEATURE
The constructor asks for a single boolean parameter, 
if set to true, the close button will be hiden and 
the alert will be deleted automatically after 10 seconds. Otherwise
the close button will be shown and the allert will disapear until the user closes it.
Render a list of alert example:
const alertList = [
    {"title": "title", "text": "body", "type": "type"},
    {"title": "title", "text": "body", "type": "type"} 
 ]
alert.renderAlerts(alertList)
we can render a single alert by following this example
alert.renderAlert("primary", "this is a primary alert", "primary")
the alert types are: 
            primary (lightBlue)
            secondary (lightGray)
            success (lightGreen)
            warning (lightYellow)
            danger danger (pink)
*/

const alert = new Alert();
alert.init();

alert.renderAlert(
  "Promo Code!",
  "Use this promocode: #5234234123 to get a 10% off on tents!",
  "success",
);

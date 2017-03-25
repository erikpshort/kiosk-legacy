var edge = require('edge');
var fs = require('fs');
var dymo = require('dymo');
var qr = require('qr-image');


fs.unlink('customerfile.png', function (err) {
    if (err) return console.log(err);
    console.log('file deleted successfully');
});


var twilio = require('twilio');


var userinput = {

    "job": "208-111-2222",
    "fullName": "john doe",
    "customer": "bogus basin",
    
"phone": "2088901309",
    // "countryCode": "1",
    // "password": "$2a$10$Y.SbthDxwPXlNhN792I.6emx1.COtwyCRPmhK41rxfLVgiK8bq7GW",
    // "verified": true,
    // "__v": 0,
    // "authyId": "35517264"
}
console.log(userinput)


var qr_svg = qr.image(userinput._id + " " + userinput.fullName, { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream('customerfile.png'));

///////////////  Printer testing
// It takes a second or two for initialization to complete.
setTimeout(function () {

    // Gets an array of IPrinter objects (Dymo printers on the current system)
    dymo.printers(null, function (err, printers) {
        if (err) throw err;
        console.log(printers);
    });
    fs.stat('customerfile.png', function (err, stats) {
        if (err) {
            return console.error(err);
        }
        console.log("before vars are set");
        var printArgs = {
            printer: '\\\\KIOSK\\DYMO KioskPrinter',   //name of printer
            label: 'test.label',                        //path to label filename
            fields: {
                title: userinput.job,
                phone: userinput.phone,
                company: userinput.customer,
                customer: userinput.fullName 

            },
            images: {
                photo: fs.readFileSync('customerfile.png')
            }
        };

        // A print object;
        console.log("right before print job starts")
        dymo.print(printArgs, function(err, res){
            if (err) throw err;
            console.log("Print job created.");
        });

    });

}, 2000);

// var svg_string = qr.imageSync('I love QR!', { type: 'pdf' });

// var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// Send the text message.
//client.sendMessage({
//  to: '+12088901309',
//  from: process.env.TWILIO_PHONE_NUMBER,
//  body: 'Phone number added to Legacy Feed & Fuel'
//}, function (err, message) {
//  if (err) {
//    console.error(err.message);
//  }
//});


// require the Twilio module and create a REST client
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     to: '+2088901309',
//     from: process.env.TWILIO_PHONE_NUMBER,
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//   })
//   .then((message) => console.log(message.sid));

// client.outgoingCallerIds.create({
//   friendlyName: "customer number",
//   phoneNumber: "+12088998672"
// }, function (err, callerId) {
//   // process.stdout.write(callerId.sid);
//   console.log(callerId)
// });


// client.outgoingCallerIds.list(function (err, data) {
//   data.outgoingCallerIds.forEach(function (callerId) {
//     console.log(callerId.phoneNumber);
//   });
// });


// // callerId informaiton
// { account_sid: 'AC596cdbd2f742d54d4c007b2219dcc5a2',
//   phone_number: 'number',
//   friendly_name: 'text',
//   validation_code: 'number',
//   call_sid: 'CA393fc9ef254e25b2eca6c27b3b5e9eba',
//   accountSid: 'AC596cdbd2f742d54d4c007b2219dcc5a2',
//   phoneNumber: 'same above',
//   friendlyName: 'same above',
//   validationCode: 'same as valadation_code',
//   callSid: 'CA393fc9ef254e25b2eca6c27b3b5e9eba' }


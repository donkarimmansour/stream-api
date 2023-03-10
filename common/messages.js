
const {Host} = require("./apiEndpoints")

const emailCodeTemplate = (code) => {
    return `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Simple Transactional Email</title>
        
      </head>
      <body class="" style="background-color: #f6f6f6;font-family: sans-serif;-webkit-font-smoothing: antialiased;font-size: 14px;line-height: 1.4;margin: 0;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <span class="preheader" style="color: transparent;display: none;height: 0;max-height: 0;max-width: 0;opacity: 0;overflow: hidden;mso-hide: all;visibility: hidden;width: 0;">Your code is ${code}</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate;mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 100%;background-color: #f6f6f6;">
          <tr>
            <td style="font-family: sans-serif;font-size: 14px;vertical-align: top;">&nbsp;</td>
            <td class="container" style="font-family: sans-serif;font-size: 14px;vertical-align: top;display: block;max-width: 580px;padding: 10px;width: 580px;margin: 0 auto !important;">
              <div class="content" style="box-sizing: border-box;display: block;margin: 0 auto;max-width: 580px;padding: 10px;">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main" style="border-collapse: separate;mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 100%;background: #ffffff;border-radius: 3px;">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper" style="font-family: sans-serif;font-size: 14px;vertical-align: top;box-sizing: border-box;padding: 20px;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 100%;">
                        <tr>
                          <td style="font-family: sans-serif;font-size: 14px;vertical-align: top;">
                            <p style="font-family: sans-serif;font-size: 14px;font-weight: normal;margin: 0;margin-bottom: 15px;">Hi there ????,</p>
                            <p style="font-family: sans-serif;font-size: 14px;font-weight: normal;margin: 0;margin-bottom: 15px;">Your 6 digit confirmation code is below, please use it to sign into your account.</p>
                            <h1 style="color: #000000;font-family: sans-serif;font-weight: 300;line-height: 1.4;margin: 0;margin-bottom: 30px;font-size: 35px;text-align: center;text-transform: capitalize;">${code}</h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
                <!-- START FOOTER -->
                <div class="footer" style="clear: both;margin-top: 10px;text-align: center;width: 100%;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 100%;">
                    <tr>
                      <td class="content-block" style="font-family: sans-serif;font-size: 12px;vertical-align: top;padding-bottom: 10px;padding-top: 10px;color: #999999;text-align: center;">
                        <span class="apple-link" style="color: #999999;font-size: 12px;text-align: center;">live stream Inc, Morocco Sale
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by" style="font-family: sans-serif;font-size: 12px;vertical-align: top;padding-bottom: 10px;padding-top: 10px;color: #999999;text-align: center;">
                        <a href="#" style="color: #999999;text-decoration: none;font-size: 12px;text-align: center;">live stream</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              </div>
            </td>
            <td style="font-family: sans-serif;font-size: 14px;vertical-align: top;">&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`
  }
  



module.exports = { emailCodeTemplate }

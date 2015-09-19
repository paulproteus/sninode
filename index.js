'use strict';

var tls = require('tls');
var crypto = require('crypto');
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/home/paulproteus/projects/sandcats/sandcats/snakeoil-sample-certs/ssl-cert-snakeoil.key'),
  cert: fs.readFileSync('/home/paulproteus/projects/sandcats/sandcats/snakeoil-sample-certs/ssl-cert-snakeoil.pem'),

  // Dynamic certificate check
  SNICallback: function (servername) {
    console.log(this);
    console.log('sni:', servername); // This function is never called
    var random = Math.floor((Math.random() * 2));
    if (random == 1) {
      console.log("1");
      var ctx = crypto.createCredentials(
        {  key: fs.readFileSync('/opt/sandstorm/var/sandcats/https/laptop.sandcats-dev.sandstorm.io/0'),
           cert: '-----BEGIN CERTIFICATE-----\r\nMIIGeDCCBWCgAwIBAgIQMvEFlcrw7X8kOaYAqUvWcTANBgkqhkiG9w0BAQUFADB/\r\nMQswCQYDVQQGEwJCRTEfMB0GA1UECxMWRm9yIFRlc3QgUHVycG9zZXMgT25seTEZ\r\nMBcGA1UEChMQR2xvYmFsU2lnbiBudi1zYTE0MDIGA1UEAxMrR2xvYmFsU2lnbiBP\r\ncmdhbml6YXRpb24gVmFsaWRhdGlvbiBDQVQgLSBHMjAeFw0xNTA5MTgyMzUxNDNa\r\nFw0xNTA5MjgwNDU5NTlaMIGNMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZv\r\ncm5pYTESMBAGA1UEBxMJUGFsbyBBbHRvMSowKAYDVQQKEyFTYW5kc3Rvcm0gRGV2\r\nZWxvcG1lbnQgR3JvdXAsIEluYy4xKTAnBgNVBAMTIGxhcHRvcC5zYW5kY2F0cy1k\r\nZXYuc2FuZHN0b3JtLmlvMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA\r\nz50YQPOittmKIiTMC884+xWuZtdl92JQAb2+sCFwAZ9JaI/opynqjk11aQKYKAtG\r\niao99zlfd8CjuhJiFSAAKEbmduRtXDLg/mrzgiWGfnJwMx7OgxrygrWkjHJmQkul\r\nNo0z4d07PuyEsZstZrtyQEO683N4ST8dOavxkB/e+tWX68bZ0HSkCtbiqX/upAi/\r\nFpODs2torBwVXfo8hfprIP9+CPPmKa6J4BjQRRnUu+2BmfUVUFnjUWwfahsX24b5\r\nNMG1/qDvUg9H9I8ud2y7rk+Iyjg3zioWMP4NT4ypgz4mpdWU2w0NYegyX2ZDfOHl\r\nBUk42zFnFbfZwU8z0VkMllhPh62DgMIpwdGVtVsoyALgfUxFzpo4YT1muAKuQhkG\r\n5fOp+gLVPg33cA60o+TyqO0UPe6ubwO/3xeuJR+CEdvvbHxCS6qUYuuFNq+r41Dj\r\nv1v1jAQiVu3+wdrcm9Wh87fzGG0REx/hPCZbL5QmH4dNS5bfn4ysRzgcL7AzXqmc\r\nwQCZqDLTX7m9Tdi01W7d4Rn3KWfx9myicxBcMtpCpOf7WjKFz7DjOM5GptWfl0et\r\nv1kuhpN4VdRW60gg/Qaii9BaVqFl57dDpjSXHZlqVXf4XAQLAfdxMdnqFQ13j8qC\r\nMnydl58X45yw6kPa4Du8p2YLgZHd60Ey4z9U0oZKZWMCAwEAAaOCAd8wggHbMA4G\r\nA1UdDwEB/wQEAwIFoDBJBgNVHSAEQjBAMD4GBmeBDAECAjA0MDIGCCsGAQUFBwIB\r\nFiZodHRwczovL3d3dy5nbG9iYWxzaWduLmNvbS9yZXBvc2l0b3J5LzArBgNVHREE\r\nJDAigiBsYXB0b3Auc2FuZGNhdHMtZGV2LnNhbmRzdG9ybS5pbzAJBgNVHRMEAjAA\r\nMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjBIBgNVHR8EQTA/MD2gO6A5\r\nhjdodHRwOi8vY3JsLmdsb2JhbHNpZ24uY29tL2dzL2dzb3JnYW5pemF0aW9udmFs\r\nY2F0ZzIuY3JsMIGcBggrBgEFBQcBAQSBjzCBjDBKBggrBgEFBQcwAoY+aHR0cDov\r\nL3NlY3VyZS5nbG9iYWxzaWduLmNvbS9jYWNlcnQvZ3Nvcmdhbml6YXRpb252YWxj\r\nYXRnMi5jcnQwPgYIKwYBBQUHMAGGMmh0dHA6Ly9vY3NwMi5nbG9iYWxzaWduLmNv\r\nbS9nc29yZ2FuaXphdGlvbnZhbGNhdGcyMB0GA1UdDgQWBBQTHqY4ZXzxAP7R3hCV\r\nWs0K38D7LzAfBgNVHSMEGDAWgBTAgBLvJedUyPoCSeL3b9+0qwQerzANBgkqhkiG\r\n9w0BAQUFAAOCAQEAf8Wuqbw0J5JyJUSJ9RW1hZ7l6tfXeFnCTNYTnSeXDFj7gJk7\r\nNDzN17r6m0c4ibEEL79Beq93qcvdZd7nBrT8bWlnNRr9W4Y7XjgdbuHlVm+3+ndM\r\nO1Prn1VXChomKk9c4Y6gt4qiQPklZOJim98FD5/DUNhjRAfhGBkaEJW3FbeL7wpr\r\nBCXSArbp8mSHqzveB4jlsnFzKNEkGdqy5FE34kNKC2xniirL8GA+eAY9vpivzPlN\r\nNvyUl2UL+jUfrgY/BoIEoQyn6CVZrwYiCsJFq3llHtZLKcoApJGqB8pLo3fm0BKG\r\nrsfiQqu2YCSXfcPXWFu/CYcXqkx4UMvzK59Viw==\r\n-----END CERTIFICATE-----'});
      return ctx.context;
    } else {
      console.log("2");
      var ctx = crypto.createCredentials({
        key: fs.readFileSync("/etc/ssl/private/ssl-cert-snakeoil.key"),
        cert: fs.readFileSync("/etc/ssl/certs/ssl-cert-snakeoil.pem")
      });
      return ctx.context;
    }
  }
};

var x = https.createServer(options, function (req, res) {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end('{}');
}).listen(8443);
setInterval(function() {
  x.key = fs.readFileSync('/opt/sandstorm/var/sandcats/https/laptop.sandcats-dev.sandstorm.io/0');
}, 1000 * 1);

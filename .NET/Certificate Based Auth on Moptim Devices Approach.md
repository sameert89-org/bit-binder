### High Level Steps
1. Support Engineer runs the installer for tray.
2. It installs a **certificate and a key** in the windows certificate store.
4. In the Agent function, enable cert required for clients, if no cert then SSL/TLS handshake fails and request is forbidden (403).
![[Pasted image 20240828141822.png]]
6. Azure forwards the header as `X-ARR-ClientCert` to the function app. But the header is not present in the request, it is a part of the initial TLS handshake that happens before HTTP request, all data in this handshake is encrypted.
7. Do additional auth inside the function to match the thumbprint of the certificate and validation date.
8. Additional validation on certs is done in backend code to ensure its Zeiss issued (thumbprint/hash match).

### Drawbacks
1. A Moptim device can be stolen and the key can be exported allowing access to the devices.
2. A Moptim device may get infected with malware where attacker can be extract the cert remotely.
3. Installer software if leaked then certs can be extracted.
4. Handling certificate expiry

### Possible solutions
In future releases some drawbacks can be fixed using following strategies:
1. Unique certificate generation for each Moptim serial number, in case a device is reported as compromised then the individual cert can be blacklisted in the backend.
2. Update packages for tray app can be provided to patch bugs and refresh certs if about to expire.
import * as os from 'os';

export function getNetworkAddresses() {
  const addresses = [];
  const interfaces = os.networkInterfaces();

  for (const name in interfaces) {
    const ifs = interfaces[name];
    if (name !== 'lo' && ifs) {
      for (let i = 0; i < ifs.length; i++) {
        const iface = ifs[i];
        if (iface.family === 'IPv4' && !iface.internal) {
          addresses.push(iface.address);
        }
      }
    }
  }

  return addresses;
}

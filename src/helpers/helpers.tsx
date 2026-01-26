let Cookies: any;
let Icon: any;

if (typeof window !== 'undefined') {
  Cookies = require('js-cookie').default;
  Icon = require('leaflet').Icon;
}

export function setCookie(name: string, value: string | Record<string, any> | Array<Record<string, any>>, args?: any) {
  if (typeof window !== 'undefined' && Cookies) {
    return Cookies.set(name, JSON.stringify(value), args);
  }
}

export function getAllCookies() {
  if (typeof window !== 'undefined' && Cookies) {
    return Cookies.get();
  }
}

export function deleteCookie(name: string, args: any = {}) {
  if (typeof window !== 'undefined' && Cookies) {
    return Cookies.remove(name, args);
  }
}
export function getCookie(name: string) {
  if (typeof window !== 'undefined' && Cookies) {
    const cookie = Cookies.get(name);
    if (cookie) {
      const parsedCookie = JSON.parse(Cookies.get(name) || '');
      return parsedCookie;
    }
  }
}

export const customIcon =
  typeof window !== 'undefined' && Icon
    ? new Icon({
        iconUrl: 'image/marker/location.png',
        iconSize: [28, 28],
      })
    : null;

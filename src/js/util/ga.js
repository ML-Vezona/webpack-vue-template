/* eslint no-console:0 */

const gaPath = '';
const gaID = ['UA-138175931-1'];

export const gapv = (page:string):void => {
  gaID.forEach((id) => {
    gtag('config', id, {
      page_path: !page ? gaPath : `${gaPath}${page}`,
    });
  });
  console.log(`%c GAPV ${gaPath}${page} `, 'background:dimgray;color:cyan');
};


export const gaev = (category:string, action:string, label:string, value:number):void => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
  console.log(`%c GAEV ${category}, ${action}, ${label}, ${value} `, 'background:dimgray;color:yellow');
};

export const gabtn = (label:string, value:number):void => {
  gtag('event', 'click', {
    event_category: 'btn',
    event_label: label,
    value,
  });
  console.log(`%c GAEV 'btn', 'click', ${label}, ${value} `, 'background:dimgray;color:yellow');
};

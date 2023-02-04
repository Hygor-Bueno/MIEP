export const API_URL = "http://187.35.128.157:71/GLOBAL/Controller/";
// const API_URL = 'http://192.168.0.99:71/GLOBAL/Controller/';

export default {
  GET_SHOP_DEPARTMENT: async signal => {
    const req = await fetch(
      `${API_URL}MIEPP/ApplicationConfiguration.php?application_id=5`,
      {signal: signal},
    );
    const json = await req.json();
    return json;
  },

  GETSCREEN: async (shop, department, signal) => {
    const req = await fetch(
      `${API_URL}MIEPP/ApplicationExecution.php?shop_id=${shop}&department_id=${department}`,
      {signal: signal},
    );
    const json = await req.json();
    return json;
  },

  GETFILE: async (media, signal) => {
    const req = await fetch(
      `${API_URL}MIEPP/ApplicationExecution.php?media_id=${media}`,
      {signal: signal},
    );
    const json = await req.json();
    return json;
  },

  GETPRODUCTLIST: async (shop, screen, signal) => {
    const req = await fetch(
      `${API_URL}MIEPP/ApplicationExecution.php?shop_id=${shop}&screen_id=${screen}`,
      {signal: signal}
    );
    const json = await req.json();
    return json;
  },

  POST_STATUS: async (body, signal) => {
    const req = await fetch(
      `${API_URL}MIEPP/Status.php`,
      {signal: signal},
      {method: 'POST', body: JSON.stringify(body)},
    );
    const json = await req.json();
    return json;
  },

  POST_RECORD: async(body, signal)=>{
    const req = await fetch(
      `${API_URL}MIEPP/Record.php`,
      {signal: signal},
      {method: 'POST', body: JSON.stringify(body)},
    );
    const json = await req.json();
    return json;
  },

  GET_MEDIA_DEPARTMENT:  async (department, signal) => {
    const req = await fetch(
      `${API_URL}MIEPP/ApplicationExecution.php?department_id=${department}`,
      {signal: signal},
    );
    const json = await req.json();
    return json;
  }

};

// export async function GET_SHOP_DEPARTMENT() {
//   return {
//     url: `${API_URL}MIEPP/ApplicationConfiguration.php?application_id=5`,
//     options: {
//       method: "GET",
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//     },
//   };
// }

// export function APLICATIONEXECUTION_GETSCREEN(shop,department) {
//   return {
//     url: `${API_URL}MIEPP/ApplicationExecution.php?shop_id=${shop}&department_id=${department}`,
//     options: {
//       method: "GET",
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//     },
//   };
// }

// export function APLICATIONEXECUTION_GETFILE(media) {
//   return {
//     url: `${API_URL}MIEPP/ApplicationExecution.php?media_id=${media}`,
//     options: {
//       method: "GET",
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//     },
//   };
// }

// export function APLICATIONEXECUTION_GETPRODUCTLIST(shop,screen) {
//   return {
//     url: `${API_URL}MIEPP/ApplicationExecution.php?shop_id=${shop}&screen_id=${screen}`,
//     options: {
//       method: "GET",
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//     },
//   };
// }

// export function APLICATIONEXECUTION_GETALLMEDIA(shop,department) {
//   return {
//     url: `${API_URL}MIEPP/ApplicationExecution.php?shop_id=${shop}&department_id=${department}&field=file`,
//     options: {
//       method: "GET",
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//     },
//   };
// }

// export function POST_STATUS(body) {
//   return {
//     url: `${API_URL}MIEPP/Status.php`,
//     options: {
//       method: "POST",
//      body: JSON.stringify(body),
//     },
//   };
// }

// export function POST_RECORD(body) {
//   return {
//     url: `${API_URL}MIEPP/Record.php`,
//     options: {
//       method: "POST",
//      body: JSON.stringify(body),
//     },
//   };
// }

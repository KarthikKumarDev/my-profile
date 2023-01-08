import axios from "axios";

const baseUrl = "https://sheets.googleapis.com/v4/spreadsheets";
const sheetId = "1PQxxFV6IQw8T6IOUm9wi0JGsZjKycraAE9JTzRCXnao";
const range = "A1:D100";
const key = "AIzaSyAK_y_GtvM9EtvBwL4EocFr_bfNkbTEKh4";


export const getSheetValuesByName = (sheetName) => {
  return axios
    .get(`${baseUrl}/${sheetId}/values/${sheetName}!${range}?key=${key}`)
};
import { google } from "googleapis";

export function getOAuth2Client(accessToken) {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });
  return oAuth2Client;
}

export function getDriveClient(auth) {
  return google.drive({ version: "v3", auth });
}

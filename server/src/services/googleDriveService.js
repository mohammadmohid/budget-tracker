import { getOAuth2Client, getDriveClient } from "../config/googleDrive.js";
import { Readable } from "stream";

const FOLDER_NAME = "Budge It Data";

async function ensureUserFolderExists(drive) {
  const folderQuery = `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const { data } = await drive.files.list({
    q: folderQuery,
    fields: "files(id,name)",
  });

  if (data.files.length > 0) {
    return data.files[0].id;
  }

  const folder = await drive.files.create({
    resource: {
      name: FOLDER_NAME,
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  });

  return folder.data.id;
}

async function getFileId(drive, folderId, fileName) {
  const query = `'${folderId}' in parents and name='${fileName}' and trashed=false`;
  const { data } = await drive.files.list({
    q: query,
    fields: "files(id,name)",
  });

  if (data.files.length > 0) {
    return data.files[0].id;
  }

  return null;
}

export async function saveDataToDrive(accessToken, fileName, data) {
  const auth = getOAuth2Client(accessToken);
  const drive = getDriveClient(auth);
  const folderId = await ensureUserFolderExists(drive);
  const fileId = await getFileId(drive, folderId, fileName);

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };

  // Convert Buffer to Readable stream
  const buffer = Buffer.from(JSON.stringify(data, null, 2));
  const stream = new Readable({
    read() {
      this.push(buffer);
      this.push(null); // End the stream
    },
  });

  const media = {
    mimeType: "application/json",
    body: stream, // Use stream instead of Buffer
  };

  if (fileId) {
    await drive.files.update({
      fileId,
      media,
    });
  } else {
    await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id",
    });
  }
}

export async function readDataFromDrive(accessToken, fileName) {
  const auth = getOAuth2Client(accessToken);
  const drive = getDriveClient(auth);
  const folderId = await ensureUserFolderExists(drive);
  const fileId = await getFileId(drive, folderId, fileName);

  if (!fileId) {
    return fileName.includes("profile") ? null : [];
  }

  const response = await drive.files.get({
    fileId,
    alt: "media",
  });

  let jsonString;
  if (typeof response.data === "string") {
    jsonString = response.data;
  } else if (Buffer.isBuffer(response.data)) {
    jsonString = response.data.toString("utf8");
  } else if (response.data && typeof response.data === "object") {
    // If it's already an object, return it directly
    return response.data;
  } else {
    console.error(
      "Unexpected data type from Google Drive:",
      typeof response.data
    );
    console.error("Data content:", response.data);
    return fileName.includes("profile") ? null : [];
  }

  try {
    return JSON.parse(jsonString);
  } catch (parseError) {
    console.error("JSON parse error:", parseError);
    console.error("Raw data:", jsonString);
    return fileName.includes("profile") ? null : [];
  }
}

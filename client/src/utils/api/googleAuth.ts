export const initializeGoogleClient = (clientId: string) =>
  new Promise<string | null>((resolve, reject) => {
    if (
      !window.google ||
      !window.google.accounts ||
      !window.google.accounts.oauth2
    ) {
      return reject("Google client not available");
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (response: { access_token?: string; error?: string }) => {
        if (response.access_token) {
          resolve(response.access_token);
        } else {
          console.error("Token error:", response.error);
          resolve(null);
        }
      },
    });

    tokenClient.requestAccessToken({ prompt: "" }); // silent
  });

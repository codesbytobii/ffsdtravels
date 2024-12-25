const accessTokenString = localStorage.getItem("accessToken");
const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

export { accessToken };

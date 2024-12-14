export function setacessTokenForOwner(value) {
  localStorage.setItem("acessTokenAdmin", JSON.stringify(value));
  return true;
}
export function setacessTokenForUser(value) {
  localStorage.setItem("acessTokenUser", JSON.stringify(value));
  return true;
}

export function accessTokenFromLocalStorageOfOwner() {
  const token = JSON.parse(localStorage.getItem("acessTokenAdmin"));
  return "Bearer " + token;
}
export function accessTokenFromLocalStorageOfUser() {
  const token = JSON.parse(localStorage.getItem("acessTokenUser"));
  return "Bearer " + token;
}

export function logoutOwner() {
  localStorage.removeItem("acessTokenAdmin");
}
export function logoutUser() {
  localStorage.removeItem("acessTokenUser");
}

export function logoutBothUser() {
  logoutOwner();
  logoutUser();
  localStorage.removeItem("UserDetails");
}

const USERS_KEY = 'netflix_users';
const SESSION_KEY = 'netflix_session';

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUser(name, email, password) {
  const users = getUsers().filter((user) => user.email !== email);
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, { name, email, password }]));
}

export function findUser(email, password) {
  return getUsers().find((user) => user.email === email && user.password === password);
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function setSession(email) {
  localStorage.setItem(SESSION_KEY, email);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
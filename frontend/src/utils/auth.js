class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Проверка ответа сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(newUserData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: newUserData.email,
        password: newUserData.password,
      }),
    }).then((res) => this._getResponseData(res));
  }

  login(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then((res) => this._getResponseData(res))
      .then((data) => {
        if (data.token) {
          return data
        }
      })
  }

  logout() {
    return fetch(`${this._baseUrl}/sign-out`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

  // Проверка корректности токена через запрос на эндпоинт /users/me
  // При повторном визите пользователи не должны вновь авторизовываться
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }
}

const auth = new Auth({
  baseUrl: "https://api.nata.nomoredomains.rocks",
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
});

export default auth;

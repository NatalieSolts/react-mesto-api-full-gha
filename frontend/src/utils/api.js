// Класс Api , внутри которого описаны запросы к серверу

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверка ответа сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

  // Редактирование профиля
  sendUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // Обновление аватара пользователя
  updateAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

  // Добавление новой карточки
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // Удаление карточки
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/` + _id, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

  // Постановка лайка карточки
  _addLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/` + _id, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // Снятие лайка
  _deleteLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/` + _id, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(_id, isLiked) {
    return !isLiked ? this._addLike(_id) : this._deleteLike(_id);
  }
}

const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  baseUrl: "https://nata.nomoredomains.rocks",
  headers: {
    //authorization: "93a90e29-0cdc-487a-9ed4-31b8026d8e92",
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;

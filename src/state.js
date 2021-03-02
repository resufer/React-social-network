// import messagesReducer from "./redux/messages-reducer";
// import profileReducer from "./redux/profile-reducer";

// let store = {
//   _state: {
//     profilePage: { // ветка страницы профиля
//       postData: [{ id: 1, text: 'some' }, { id: 2, text: 'not some' }, { id: 3, text: 'fuck you evan' }, { id: 4, text: 'sorry' }, { id: 5, text: 'No' }],
//       newPostText: 'new post'
//     },
//     messagesPage: { // ветка страницы сообщений
//       chatData: [{ id: 1, name: 'Gerge', src: 'https://megahvost.com/files/animal/288/1/5c1c6ab867918.jpeg' },
//       { id: 2, name: 'Dima', src: 'http://cybercoon.ru/images/product/xiu-mei/img_3322.jpg' },
//       { id: 3, name: 'Vit', src: 'https://avatars.mds.yandex.net/get-zen_doc/1877341/pub_5df7281d11691d00aeaa9697_5df729cae6e8ef00ad68b5dc/scale_1200' },
//       { id: 4, name: 'Apple', src: 'https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg' },
//       { id: 5, name: 'Mel', src: 'https://wallbox.ru/wallpapers/main2/201724/1497534716594290fc7b0766.64208759.jpg' }],
//       messageData: [{ id: 1, message: 'Hi' }, { id: 2, message: 'Hey yoi sami yoi' }, { id: 3, message: 'Caramelledansen' }],
//       newMessageText: ''
//     },
//   },
//   getState() {
//     return this._state;
//   },
//   rerenderEntireTree() {
//     console.log('asdas')
//   },
//   addPost() {
//     let newPost = {
//       id: this._state.profilePage.postData[this._state.profilePage.postData.length - 1].id + 1,
//       text: this._state.profilePage.newPostText
//     }
//     this._state.profilePage.postData.push(newPost);
//     this._state.profilePage.newPostText = '';
//     this.rerenderEntireTree(this._state);
//   },
//   changeNewPostText(newText) {
//     this.state.profilePage.newPostText = newText;
//     this.rerenderEntireTree(this._state);
//   },
//   subscribe(observer) {
//     this.rerenderEntireTree = observer
//   },
//   dispatch(action) {
//     this._state.profilePage = profileReducer(this._state.profilePage, action);
//     this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
//     this.rerenderEntireTree(this._state);
//   }
// };

// window.store = store

// export default store;

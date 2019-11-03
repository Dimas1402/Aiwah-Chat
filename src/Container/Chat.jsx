import React from "react";
// import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Chats from "../components/Chats";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      user: "",
      name: "",
      nameUser: "",
      id: "",
      deleteid: "",
      unfriendId: "",
      idLogin: "",
      telp: "",
      email: "",
      chat: [],
      message: [],
      pesanChat: [],
      sender_id: "",
      receiver_id: "",
      cari: "",
      saveCari: "",
      text: "",
      idUser: "",
      friend_id: "",
      id_login: "",
      avatar: null,
      on: false,
      onUpload: false,
      loading: false,
      show: false
    };
  }

  componentDidMount() {
    const mystate = localStorage.getItem("user");
    const users = JSON.parse(mystate);
    const { avatars, names, telps, emails } = this.state.user;
    const id = this.state.idLogin.id;
    window.scrollTo(0, 0);

    this.handleChangeChat();
    setInterval(this.handleChangeChat, 5000);
    const { idUser } = this.state.user;
    // console.log('id', this.state.user);
    // -------------------- API menampilkan kontak  teman------------------
    axios
      .get(`https://aqueous-hollows-28311.herokuapp.com/friend/${id}`)
      .then(res => {
        // console.log('chat', res.data.friend.friend_id);
        const chat = res.data.friend;
        const friend_id = res.data.friend.friend_id;
        this.setState({
          chat: chat,
          friend_id: friend_id
        });
      });
    this.setState({
      user: users,
      avatar: avatars,
      telp: telps,
      email: emails,
      name: names
    });
  }

  componentWillMount() {
    this.handleChangeChat();
    const mystate = localStorage.getItem("user");
    const users = JSON.parse(mystate);
    const text = this.state.text;

    this.setState({
      idLogin: users,
      text: text
    });
  }

  getUser = () => {
    const idUser = this.state.user.id;
    // -------------------- API menampilkan user ------------------
    axios
      .get(`https://aqueous-hollows-28311.herokuapp.com/tampil/${idUser}`)
      .then(ress => {
        // console.log('idUsers =>', ress.data);
        localStorage.setItem("user", JSON.stringify(ress.data));

        this.setState({
          user: ress.data
        });
      });
  };
  // uploadImage
  fileSelectedHandler = e => {
    e.preventDefault();
    const avatar = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onloadend = () => {
      this.setState({
        avatar: avatar,
        base64: reader.result
      });
      this.fileUploadHandler();
    };
  };

  fileUploadHandler = () => {
    this.setState({ loading: true });
    const id = this.state.user.id;

    // -------------------- API edit gambar ------------------
    axios
      .put(`https://aqueous-hollows-28311.herokuapp.com/avatar/edit`, {
        avatar: this.state.base64,
        id
      })
      .then(res => {
        // console.log('uplod', res);
        this.getUser();
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        // console.log(err);
      });
  };
  // edit user --------------------------------------------
  handleChangeEdit = e => {
    e.preventDefault();
    // console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value
      // this.fileEditData();
    });
  };

  fileEditData = () => {
    this.setState({ loading: true });
    const id = this.state.user.id;
    let name = this.state.name;
    let telp = this.state.telp;
    const email = this.state.email;
    // -------------------- API edit data user ------------------
    axios
      .put("https://aqueous-hollows-28311.herokuapp.com/user/edit", {
        id,
        name,
        telp,
        email
      })
      .then(res => {
        // console.log(res);
        this.getUser();
        this.setState({
          name: this.state.user.name,
          telp: this.state.user.telp,
          email: this.state.user.email,
          id: this.state.user.id,
          loading: false
        });
      });
  };

  handleChangeEditPassword = e => {
    e.preventDefault();
    // console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editPassword = () => {
    this.setState({ loading: true });
    const password = this.state.password;
    const id = this.state.user.id;

    axios
      .put(`https://aqueous-hollows-28311.herokuapp.com/password/edit`, {
        password,
        id
      })
      .then(res => {
        // console.log(res);
        this.setState({
          password: this.state.password,
          loading: false
        });
      });
  };

  // chat-------------------------------------->
  handleChangeChat = () => {
    const idLogin = this.state.user.id;
    const dataId = this.state.idUser;

    // console.log('IdUser <=', this.state.idUser);
    // -------------------- API menampilkan pesan  ------------------
    axios
      .get(
        `https://aqueous-hollows-28311.herokuapp.com/message/${idLogin}/` +
          dataId
      )
      .then(res => {
        const pesan = res.data;
        const pesanChat = res.data.message;
        // console.log('contactUser', res.data);
        this.setState({
          message: pesan,
          pesanChat: pesanChat
        });
      });
  };

  handleRemove = () => {
    const idPesan = this.state.deleteid;
    axios
      .delete(
        `https://aqueous-hollows-28311.herokuapp.com/chat/delete/${idPesan}`
      )
      .then(res => {
        this.handleChangeChat();
      });
  };

  mapingchat = chat => {
    console.log("iddddddddddd chaaaata", chat.id);
    this.setState({
      deleteid: chat.id
    });
  };

  // toggle----------------------------------->
  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  toggleUpload = () => {
    this.setState({
      onUpload: !this.state.onUpload
    });
  };

  idChat = async chats => {
    // console.log("staet", this.state.idUser);
    const nameUser = chats.name;
    const dataId = await chats.friend_id;
    const friendid = chats.id;
    // const dataIds = await chats.id;
    // console.log(dataId);
    // console.log(nameUser);
    this.setState({
      idUser: dataId,
      unfriendId: friendid,
      // friend_id: dataIds,
      nameUser: nameUser
    });
    this.handleChangeChat();
    // setInterval(this.handleChangeChat, 5000);
  };

  // kirim pesan-----------------------------------_>
  handleChangeMessage = e => {
    this.setState({
      text: e.target.value
    });
  };

  // err ---------------------->

  handleSubmit = e => {
    e.preventDefault();
    const dataPesan = {
      sender_id: this.state.user.id,
      receiver_id: this.state.idUser,
      text: this.state.text
    };

    // console.log('sender', this.state.user);
    // console.log('receiver', this.state.idUser);
    // -------------------- API mengirim pesan ------------------
    axios
      .post(
        "https://aqueous-hollows-28311.herokuapp.com/api/message/send",
        dataPesan
      )
      .then(res => {
        // console.log('pesan terkirim', res);
        this.setState({
          text: ""
        });
        this.handleChangeChat();
      })
      .catch(err => {
        alert("Choose Contact");
      });
  };

  // search ---------------------
  handleChangeSearch = e => {
    // console.log(e.target);
    this.setState({
      cari: e.target.value
    });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const cari = this.state.cari;
    const id = this.state.user.id;
    axios
      .post("https://aqueous-hollows-28311.herokuapp.com/search", {
        cari,
        id
      })

      .then(res => {
        // console.log('cari', res.data);
        const dataCari = res.data;
        this.setState({
          cari: "",
          saveCari: dataCari,
          loading: false
        });
        // console.log('data cari', this.state.saveCari);
      });
  };

  // add freinds <------------------------------------------

  handleChangeAddFriends = cari => {
    // const { loading } = this.state;
    const friend_id = cari.id;
    const id_login = this.state.user.id;

    console.log("idmasuk", cari.id);

    axios
      .post(
        `https://aqueous-hollows-28311.herokuapp.com/friend/${id_login}/${friend_id}`
      )
      .then(res => {
        console.log(res);
        if (res.data.message === "") {
          return alert("anda sudah berteman");
        } else {
          window.location.reload();
        }
      });
  };

  klikPict = () => {
    window.location.reload();
  };

  handleUnfriend = () => {
    const freinds = this.state.unfriendId;
    const id = this.state.user.id;
    axios
      .delete(
        `https://aqueous-hollows-28311.herokuapp.com/unfriend/${freinds}/${id}`
      )
      .then(res => {
        // console.log('delete', res);

        window.location.reload();
      });
  };

  render() {
    const { idChat, handleRemove, handleUnfriend } = this;
    const chatt = this.state.chatUser;

    // console.log(' ini chat ku yaaa', chatt);

    const signOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };

    // console.log(localStorage.getItem('token'));

    if (!localStorage.getItem("token", "user")) {
      return <Redirect to="/login" />;
    }

    return (
      <Chats
        loading={this.state.loading}
        avatar={this.state.user.avatar}
        name={this.state.user.name}
        handleSubmitSearch={this.handleSubmitSearch}
        handleChangeSearch={this.handleChangeSearch}
        chat={this.state.chat}
        saveCari={this.state.saveCari}
        chatName={this.state.chat.name}
        idChat={idChat}
        handleChangeAddFriends={this.handleChangeAddFriends}
        handleUnfriend={handleUnfriend}
        toggleUpload={this.toggleUpload}
        fileSelectedHandler={this.fileSelectedHandler}
        onUpload={this.state.onUpload}
        stateloading={this.stateloading}
        fileUploadHandler={this.fileUploadHandler}
        names={this.state.name}
        handleChangeEdit={this.handleChangeEdit}
        telp={this.state.telp}
        email={this.state.email}
        fileEditData={this.fileEditData}
        userTelp={this.state.user.telp}
        userEmail={this.state.user.email}
        handleChangeEditPassword={this.handleChangeEditPassword}
        password={this.state.password}
        editPassword={this.editPassword}
        signOut={signOut}
        nameUser={this.state.nameUser}
        pesanChat={this.state.pesanChat}
        userId={this.state.user.id}
        mapingchat={this.mapingchat}
        handleRemove={handleRemove}
        handleSubmit={this.handleSubmit}
        text={this.state.text}
        handleChangeMessage={this.handleChangeMessage}






      />
    );
  }
}

export default Chat;

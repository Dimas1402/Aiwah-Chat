import React from "react";
// import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      user: "",
      name: "",
      nameUser: "",
      id: "",
      deleteid:"",
      unfriendId:"",
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

  mapingchat = (chat) => {
    console.log("iddddddddddd chaaaata" ,chat.id)
    this.setState({
        deleteid:chat.id
    })
  }

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
    const friendid = chats.id
    // const dataIds = await chats.id;
    // console.log(dataId);
    // console.log(nameUser);
    this.setState({
      idUser: dataId,
      unfriendId:friendid,
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
          if(res.data.message === ""){
            return alert("anda sudah berteman")
          }else{
      window.location.reload();
          }
  
      })
     
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
      <div className="container-fluid">
        <div id="chat" className="container">
          {this.state.loading && (
            <div
              id="div"
              style={{
                position: "absolute",
                top: "200px",
                left: "600px",
                zIndex: "9999"
              }}
            >
              <span id="span"></span>
              <span id="span"></span>
              <span id="span"></span>
              <span id="span"></span>
              <span id="span"></span>
            </div>
          )}
          <div
            className="row"
            style={{ height: "100vh", background: "#eceff1" }}
          >
            <div
              className="col-sm-4"
              style={{
                borderRight: "1px solid #ffff"
              }}
            >
              <div className="row">
                <div
                  className="navbar"
                  style={{
                    background: "#6a1b9a",
                    width: "100%",
                    height: "55px"
                  }}
                >
                  <img
                    src={this.state.user.avatar}
                    class="rounded-circle float-left "
                    width="40"
                    height="40"
                    alt={this.state.user.avatar}
                  ></img>
                  <p
                    id="nameUser"
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginRight: "70%"
                    }}
                  >
                    {this.state.user.name}
                  </p>
                  <button
                    id="btn-edit"
                    type="button"
                    class="btn btn-outline-light"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                  >
                    <i id="edit" className="fas fa-user-edit"></i>
                  </button>
                </div>
              </div>
              <form onSubmit={this.handleSubmitSearch}>
                <input
                  id="cari"
                  class="form-control search"
                  onChange={this.handleChangeSearch}
                  type="text"
                  value={this.state.cari}
                  placeholder="cari kontak.."
                  style={{ marginTop: "10px", paddingLeft: "40px" }}
                />
                <button
                  onClick={this.handleSubmitSearch}
                  id="fas-search"
                  type="submit"
                  class="btn btn-outline-light"
                  disabled={this.state.loading}
                >
                  {" "}
                  <i class="fas fa-search"></i>
                </button>
              </form>

              <div
                className="list-group"
                style={{
                  overflowX: "hidden",
                  maxWidth: "100%",
                  maxHeight: "77vh"
                }}
              >
                {this.state.chat.length === 0 && !this.state.saveCari ? (
                  <div>
                    <h1
                      style={{
                        color: "#D4D4D4",
                        textAlign: "center",
                        marginTop: "150px"
                      }}
                    >
                      No Contacts.
                    </h1>
                  </div>
                ) : this.state.saveCari &&
                  this.state.saveCari === this.state.chat.name ? (
                  <div>
                    <h1
                      style={{
                        color: "#D4D4D4",
                        textAlign: "center",
                        marginTop: "150px"
                      }}
                    >
                      kosong
                    </h1>
                  </div>
                ) : this.state.saveCari ? (
                  <div>
                    <Link to="/chat">
                      <button
                        id="btn-back"
                        onClick="window.location.reload();"
                        value="Refresh Page"
                        class="btn btn-outline-light"
                      >
                        <i class="fas fa-arrow-left"></i>
                      </button>
                    </Link>

                    {this.state.saveCari.map((cari, index) => (
                      <div
                        className="row"
                        key={cari.id}
                        onClick={() => idChat(cari)}
                      >
                        <div
                          class="list-group list-chat"
                          style={{ width: "100%" }}
                        >
                          <Link to={`/chat/${cari.name}`}>
                            <button
                              id="btn-chat"
                              style={{ background: "#E9E0EB" }}
                              // onClick={this.handleChangeChat}
                              type="button"
                              class="list-group-item list-group-item-action"
                            >
                              <img
                                alt=""
                                src={cari.avatar}
                                class="rounded-circle float-left "
                                width="50"
                                height="50"
                                style={{ border: "1px solid #6A1B9A" }}
                              ></img>
                              <p>
                                {cari.name}
                                <Link to="/chat">
                                  <button
                                    id="addFriends"
                                    type="button"
                                    class="btn btn-outline-light"
                                    key={cari.id}
                                    onClick={() =>
                                      this.handleChangeAddFriends(cari)
                                    }
                                  >
                                    {" "}
                                    <i style={{}} class="fas fa-user-plus"></i>
                                  </button>
                                </Link>
                              </p>
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {this.state.chat.map((chats, index) => (
                      <div
                        className="row"
                        key={chats.friend_id}
                        onClick={() => idChat(chats)}
                       
                      >
                        <div
                          class="list-group list-chat"
                          style={{ width: "100%" }}
                        >
                          <Link to={`/chat/${chats.name}`}>
                            <button
                              id="btn-chat"
                              style={{ background: "#E9E0EB" }}
                              class="list-group-item list-group-item-action"
                            >
                              <img
                                alt=""
                                src={chats.avatar}
                                class="rounded-circle float-left "
                                width="50"
                                height="50"
                                style={{ border: "1px solid #6A1B9A" }}
                              ></img>
                              <p>
                                {chats.name}
                                <Link to="/chat">
                                  <button
                                    id="btn-unfriend"
                                    type="button"
                                    class="btn btn-outline-light"
                                    data-toggle="modal"
                                    data-target="#exampleModalhapus"
                                    // key={chats.id}
                                    // onClick={() => handleUnfriend(chats)}
                                  >
                                    {" "}
                                    unfriend
                                  </button>
                                  {/* <!-- Modal --> */}
                                  <div
                                    class="modal fade"
                                    id="exampleModalhapus"
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                  >
                                    <div class="modal-dialog" role="document">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5
                                            class="modal-title"
                                            id="exampleModalLabel"
                                            style={{ color: "white" }}
                                          >
                                            Hapus Kontak
                                          </h5>
                                          <button
                                            type="button"
                                            class="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <span
                                              style={{ color: "white" }}
                                              aria-hidden="true"
                                            >
                                              &times;
                                            </span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                          Apakah anda yakin Ingin menghapus
                                          kontak ini?
                                        </div>
                                        <div class="modal-footer">
                                          <button
                                            type="button"
                                            class="btn btn-"
                                            data-dismiss="modal"
                                          >
                                            Tidak
                                          </button>
                                          <button
                                            type="button"
                                            class="btn btn-danger"
                                            aria-hidden="true"
                                            key={chats.id}
                                            onClick={() =>
                                              handleUnfriend(chats)
                                            }
                                          >
                                            Ya
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* batas modal */}
                                </Link>
                              </p>{" "}
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 
           ------------------------------------------------ modal--------------------------------------------------------- */}
              <div
                class="modal fade"
                id="exampleModalLong"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        style={{ color: "white" }}
                        class="modal-title"
                        id="exampleModalLongTitle"
                      >
                        Profil
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span style={{ color: "white" }} aria-hidden="true">
                          &times;
                        </span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {/* ------------------------------------- modal body ------------------------------------------ */}
                      <div>
                        <div id="toggle">
                          <div className="row image-profil">
                            <input
                              id="btn-profile"
                              type="file"
                              accept="image/png, image/jpeg, image/gif"
                              onClick={this.toggleUpload}
                              onChange={this.fileSelectedHandler}
                            />
                            {this.state.onUpload && (
                              <div id="upload">
                                <button
                                  disabled={this.stateloading}
                                  onClick={this.fileUploadHandler}
                                >
                                  Upload
                                </button>
                              </div>
                            )}
                            <img
                              id="img"
                              src={this.state.user.avatar}
                              className="rounded-circle"
                              width="150"
                              height="150"
                              alt={this.state.user.avatar}
                            ></img>
                          </div>

                          <div
                            className="row ml-1"
                            style={{ marginTop: "20px" }}
                          >
                            <a
                              style={{
                                color: "grey",
                                borderBottom: "1px solid grey"
                              }}
                            >
                              Username
                            </a>{" "}
                            <p style={{ marginLeft: "20px" }}>
                              {this.state.user.name}
                            </p>
                            {/* -------- modal -------- */}
                            <div className="edit">
                              <button
                                id="button-edit"
                                type="button"
                                class="btn btn-outline-primary border-0"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                data-whatever="@getbootstrap"
                              >
                                edit
                              </button>
                            </div>
                            <div
                              class="modal fade"
                              id="exampleModal"
                              tabindex="-1"
                              role="dialog"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                      style={{ color: "white" }}
                                    >
                                      Edit Profil
                                    </h5>
                                    <button
                                      type="button"
                                      class="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <form>
                                      <div class="form-group">
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Username
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="recipient-name"
                                          name="name"
                                          value={this.state.name}
                                          onChange={this.handleChangeEdit}
                                        />
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Telp
                                        </label>
                                        <input
                                          type="number"
                                          class="form-control"
                                          id="recipient-name"
                                          name="telp"
                                          onChange={this.handleChangeEdit}
                                          value={this.state.telp}
                                        />
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Email
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="recipient-name"
                                          name="email"
                                          onChange={this.handleChangeEdit}
                                          value={this.state.email}
                                        />
                                      </div>
                                    </form>
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      disabled={this.stateloading}
                                      onClick={this.fileEditData}
                                      type="button"
                                      class="btn btn-primary"
                                    >
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* ------- modal ---------- */}
                          </div>

                          <div
                            style={{ marginTop: "20px" }}
                            className="row ml-1"
                          >
                            <a
                              style={{
                                color: "grey",
                                borderBottom: "1px solid grey"
                              }}
                            >
                              telp
                            </a>
                            <p style={{ marginLeft: "65px" }}>
                              {this.state.user.telp}
                            </p>
                            {/* -------- modal -------- */}
                            <div className="edit">
                              <button
                                id="button-edit"
                                type="button"
                                class="btn btn-outline-primary border-0"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                data-whatever="@getbootstrap"
                              >
                                edit
                              </button>
                            </div>
                            {/* ------- modal ---------- */}
                          </div>
                          <div
                            className="row ml-1"
                            style={{ marginTop: "20px" }}
                          >
                            <a
                              style={{
                                color: "grey",
                                borderBottom: "1px solid grey"
                              }}
                            >
                              Email
                            </a>{" "}
                            <p style={{ marginLeft: "53px" }}>
                              {" "}
                              {this.state.user.email}
                            </p>
                            {/* -------- modal -------- */}
                            <div className="edit">
                              <button
                                id="button-edit"
                                type="button"
                                class="btn btn-outline-primary border-0"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                data-whatever="@getbootstrap"
                              >
                                edit
                              </button>
                            </div>
                            {/* ------- modal ---------- */}
                          </div>
                          <div
                            className="row ml-1"
                            style={{ marginTop: "20px" }}
                          >
                            <a
                              style={{
                                color: "grey",
                                borderBottom: "1px solid grey"
                              }}
                            >
                              Password
                            </a>{" "}
                            <p style={{ marginLeft: "30px" }}> </p>
                            {/* -------- modal -------- */}
                            <div className="edit">
                              <button
                                id="button-edit"
                                type="button"
                                class="btn btn-outline-primary border-0"
                                data-toggle="modal"
                                data-target="#exampleModal2"
                                data-whatever="@getbootstrap"
                              >
                                edit
                              </button>
                              <div
                                class="modal fade"
                                id="exampleModal2"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5
                                        class="modal-title"
                                        id="exampleModalLabel"
                                      >
                                        Edit Password
                                      </h5>
                                      <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    {/* ---------modal password----- */}
                                    <div class="modal-body">
                                      {" "}
                                      <label
                                        for="recipient-name"
                                        class="col-form-label"
                                      >
                                        Password
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="recipient-name"
                                        name="password"
                                        onChange={this.handleChangeEditPassword}
                                        value={this.state.password}
                                      />
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                        onClick={this.editPassword}
                                        disabled={this.state.loading}
                                      >
                                        Save changes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* ------- modal ---------- */}
                          </div>

                          <Link to="/login">
                            <p style={{ marginTop: "10px" }} onClick={signOut}>
                              logout
                            </p>
                          </Link>
                        </div>
                      </div>
                      {/* ---------------------------- modal body ----------------------------- */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-8 scrollspy-example">
              <div className="row">
                <div
                  className="navbar"
                  style={{
                    background: "#6a1b9a",
                    width: "100%",
                    height: "55px"
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "15px"
                    }}
                  >
                    {this.state.nameUser}
                  </p>
                </div>

                <div className="col">
                  <div
                    class="list-group"
                    style={{
                      width: "100%",
                      maxHeight: "80vh",
                      overflowX: "hidden"
                    }}
                  >
                    <div
                      id="messages"
                      class="list-group"
                      style={{
                        marginTop: "20px"
                      }}
                    >
                      {this.state.pesanChat.map((chat, index) => (
                        <div key={chat.id}>
                          {this.state.user.id === chat.sender_id ? (
                            <p
                              data-toggle="modal"
                              data-target="#exampleModal1"
                              className="list-group-item"
                              key={chat.id}
                              onClick={() => this.mapingchat(chat)}
                              style={{
                                background: "#D8B6DE",
                                color: "black",

                                float: "right",
                                marginTop: "20px",
                                borderRadius: "10px",
                                border: "1px solid #EDEDED"
                              }}
                            >
                              {chat.text}
                              {/* <!-- Modal --> */}
                              <div
                                class="modal fade"
                                id="exampleModal1"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5
                                        style={{ color: "white" }}
                                        class="modal-title"
                                        id="exampleModalLabel"
                                      >
                                        Hapus Pesan
                                      </h5>
                                      <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <span
                                          style={{ color: "white" }}
                                          aria-hidden="true"
                                        >
                                          &times;
                                        </span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                      Hapus pesan ini ?
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn btn-danger"
                                        data-dismiss="modal"
                                      >
                                        Tidak
                                      </button>
                                      <button
                                        type="button"
                                        key={chat.id}
                                        onClick={() => handleRemove(chat)}
                                        class="btn btn-primary"
                                      >
                                        Ya
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </p>
                          ) : (
                            <p
                              className="list-group-item"
                              style={{
                                float: "left",
                                borderRadius: "10px",
                                background: "white",
                                border: "1px solid #EDEDED"
                              }}
                            >
                              {chat.text}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div id="icon-mess">
                <form onSubmit={this.handleSubmit}>
                  <input
                    style={{ borderRadius: "10px" }}
                    class="form-control "
                    type="text"
                    placeholder="kirim pesan...."
                    value={this.state.text}
                    onChange={this.handleChangeMessage}
                    required
                  ></input>
                  <i class="far fa-comment-dots" />
                  <button type="submit" className='fas fa-arrow-circle-right' id="send">
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;

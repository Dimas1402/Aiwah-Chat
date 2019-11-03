import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const Chat = props => {
  return (
    <div className="container-fluid">
      <div id="chat" className="container">
        {props.loading && (
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
        <div className="row" style={{ height: "100vh", background: "#eceff1" }}>
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
                  src={props.avatar}
                  class="rounded-circle float-left "
                  width="40"
                  height="40"
                  alt={props.avatar}
                ></img>
                <p
                  id="nameUser"
                  style={{
                    color: "white",
                    fontSize: "12px",
                    marginRight: "70%"
                  }}
                >
                  {props.name}
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
            <form onSubmit={props.handleSubmitSearch}>
              <input
                id="cari"
                class="form-control search"
                onChange={props.handleChangeSearch}
                type="text"
                value={props.cari}
                placeholder="cari kontak.."
                style={{ marginTop: "10px", paddingLeft: "40px" }}
              />
              <button
                onClick={props.handleSubmitSearch}
                id="fas-search"
                type="submit"
                class="btn btn-outline-light"
                disabled={props.loading}
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
              {props.chat.length === 0 && !props.saveCari ? (
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
              ) : props.saveCari && props.saveCari === props.chatName ? (
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
              ) : props.saveCari ? (
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

                  {props.saveCari.map((cari, index) => (
                    <div
                      className="row"
                      key={cari.id}
                      onClick={() => props.idChat(cari)}
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
                                    props.handleChangeAddFriends(cari)
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
                  {props.chat.map((chats, index) => (
                    <div
                      className="row"
                      key={chats.friend_id}
                      onClick={() => props.idChat(chats)}
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
                                        Apakah anda yakin Ingin menghapus kontak
                                        ini?
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
                                            props.handleUnfriend(chats)
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
                            onClick={props.toggleUpload}
                            onChange={props.fileSelectedHandler}
                          />
                          {props.onUpload && (
                            <div id="upload">
                              <button
                                disabled={props.stateloading}
                                onClick={props.fileUploadHandler}
                              >
                                Upload
                              </button>
                            </div>
                          )}
                          <img
                            id="img"
                            src={props.avatar}
                            className="rounded-circle"
                            width="150"
                            height="150"
                            alt={props.avatar}
                          ></img>
                        </div>

                        <div className="row ml-1" style={{ marginTop: "20px" }}>
                          <a
                            style={{
                              color: "grey",
                              borderBottom: "1px solid grey"
                            }}
                          >
                            Username
                          </a>{" "}
                          <p style={{ marginLeft: "20px" }}>{props.name}</p>
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
                                        value={props.names}
                                        onChange={props.handleChangeEdit}
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
                                        onChange={props.handleChangeEdit}
                                        value={props.telp}
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
                                        onChange={props.handleChangeEdit}
                                        value={props.email}
                                      />
                                    </div>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-danger"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    disabled={props.stateloading}
                                    onClick={props.fileEditData}
                                    type="button"
                                    class="btn btn-primary"
                                    aria-hidden="true"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* ------- modal ---------- */}
                        </div>

                        <div style={{ marginTop: "20px" }} className="row ml-1">
                          <a
                            style={{
                              color: "grey",
                              borderBottom: "1px solid grey"
                            }}
                          >
                            telp
                          </a>
                          <p style={{ marginLeft: "65px" }}>{props.userTelp}</p>
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
                        <div className="row ml-1" style={{ marginTop: "20px" }}>
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
                            {props.userEmail}
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
                        <div className="row ml-1" style={{ marginTop: "20px" }}>
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
                                      style={{ color: "white" }}
                                    >
                                      Edit Password
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
                                      onChange={props.handleChangeEditPassword}
                                      value={props.password}
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
                                      onClick={props.editPassword}
                                      disabled={props.loading}
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
                          <p
                            style={{ marginTop: "10px" }}
                            onClick={props.signOut}
                          >
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
                  {props.nameUser}
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
                    {props.pesanChat.map((chat, index) => (
                      <div key={chat.id}>
                        {props.userId === chat.sender_id ? (
                          <p
                            data-toggle="modal"
                            data-target="#exampleModal1"
                            className="list-group-item"
                            key={chat.id}
                            onClick={() => props.mapingchat(chat)}
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
                                      onClick={() => props.handleRemove(chat)}
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
              <form
                onSubmit={props.handleSubmit}
                style={{
                  bottom: "0",
                  position: "fixed",
                  width: "53%"
                }}
              >
                <input
                  style={{ borderRadius: "10px" }}
                  class="form-control "
                  type="text"
                  placeholder="kirim pesan...."
                  value={props.text}
                  onChange={props.handleChangeMessage}
                  required
                ></input>
                <i class="far fa-comment-dots"></i>
                <button type="submit" class="btn btn-outline-light">
                  {" "}
                  <i id="send" class="fas fa-arrow-circle-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;

import { useState, useEffect } from "react"
import { auth } from "../utils/Firebase"
import firebase from "firebase/compat/app"
import { useNavigate } from "react-router-dom";
import routes from "../utils/Routes";

export default function Login() {
  const [input, setInput] = useState();
  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((cur) => ({
      ...cur,
      [name]: value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const { id, pw } = input
    try {
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const data = await auth.signInWithEmailAndPassword(id, pw);
      // console.log( "DATA", data);
      navigate(routes.home);

    } catch (err) {
      window.alert("아이디/비밀번호가 맞지 않습니다.")
      console.log("ERRRRRROR", err);
    }
  }
  return(
    <div>
      <a class="hiddenanchor" id="signup"></a>
      <a class="hiddenanchor" id="signin"></a>

      <div class="login_wrapper">
        <div class="animate form login_form">
          <section class="login_content">
            <form onSubmit={onSubmit}>
              <h1><img style={{height: "40px", marginTop: "-10px"}} src="/images/title.png"></img></h1>
              <div>
                <input name="id" onChange={onChange} type="text" class="form-control" placeholder="Username" required="" />
              </div>
              <div>
                <input name="pw" onChange={onChange} type="password" class="form-control" style={{marginBottom: "30px"}} placeholder="Password" required="" />
              </div>
              <div style={{display: "flex", justifyContent: "center", marginBottom: "15px"}}>
                <button style={{margin: "0"}} class="btn col-md-12 submit btn-success" href="index.html">로그인</button>
              </div>

              <div class="clearfix"></div>

              <div class="separator">
                

                <div class="clearfix"></div>
                <br />

                <div style={{marginTop: "20px"}}>
                  <h5 style={{marginBottom: "3px", fontFamily: "Noto Sans CJK KR", fontWeight: "100"}}>
                    모일수록 관리자 페이지
                  </h5>
                  <p style={{fontFamily: "Roboto"}}>Copyright 2022. LINK Co. All Rights Reserved.</p>
                </div>
              </div>
            </form>
          </section>
        </div>


      </div>
    </div>
  )
}
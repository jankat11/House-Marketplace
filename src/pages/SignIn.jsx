import { useState } from "react"
import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"


function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = event => setFormData(prev => ({
    ...prev,
    [event.target.id] : event.target.value
  }))

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if(userCredential.user) {
        navigate("/")
      }
    } catch (error) {
      console.log("error code is: ", error.code)
      toast.error("Bad User Credential:(")
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form onSubmit={onSubmit}>
          <input type="email"
            placeholder="Email"
            className="emailInput"
            id="email" value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="passwordInput"
              id="password" value={password}
              onChange={onChange}
            />
            <img src={visibilityIcon}
              alt="show password" 
              className="showPassword"
              onClick={() => setShowPassword(prev => !prev)} />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon 
                fill="#fff" 
                width="34px"
                height="34px"
              />
            </button>
          </div>
        </form>

        {/* Google OAuth */}

        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn
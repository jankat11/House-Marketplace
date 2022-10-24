import { useState } from "react"
import { toast } from 'react-toastify'
import {db} from "../firebase.config"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import OAuth from '../components/OAuth'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'



function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword : "",
  })
 
  const { name, email, password, checkPassword } = formData
  
  const navigate = useNavigate()
  
  const onChange = event => setFormData(prev => ({
    ...prev,
    [event.target.id] : event.target.value
  }))
  
  const onSubmit = async event => {
    event.preventDefault()
    console.log(password, checkPassword)
    if (password !== checkPassword) {
      toast.error("Passwords does not match!")
      return
    }

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })
      
      const formDataCopy = {...formData}
      delete formDataCopy.password
      delete formDataCopy.checkPassword
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy)

      navigate("/")
    } catch (error) {
      toast.error('Something went wrong with registration')
    }   
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
       
        <form onSubmit={onSubmit}>
        <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
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
          <div className="passwordInputDiv">
            <input type={showPassword ? "text" : "password"}
              placeholder="Re enter your Password"
              className="passwordInput"
              id="checkPassword" value={checkPassword}
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
          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon 
                fill="#fff" 
                width="34px"
                height="34px"
              />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp
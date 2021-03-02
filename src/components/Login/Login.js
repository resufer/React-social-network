import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, requiredFields } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import style from './Login.module.css';
import { login, logout } from '../../redux/auth-reducer';
import { Redirect } from "react-router-dom";

let maxLength30 = maxLengthCreator(30);

let LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >
      <div><Field component={Input} validate={[requiredFields, maxLength30]} name={'email'} placeholder={'Email'} /></div>
      <div><Field component={Input} validate={[requiredFields, maxLength30]} name={'password'} placeholder={'password'} type={'password'} /></div>
      <div><Field component='input' validate={[requiredFields, maxLength30]} name={'remember'} type={'checkbox'} /> Remember Me</div>

      {props.captchaURL && <img src={props.captchaURL} alt='captcha' />}
      {props.captchaURL && <Field placeholder='Symbols from image' name='captcha' validate={requiredFields} component={Input} />}

      {props.error && <div className={style.formSummaryError}>{props.error}</div>}
      <div><button className={style.btn}>Get</button></div>
    </form>
  )
}

let LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

let Login = (props) => {
  let onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.remember, formData.captcha);
  }

  if (props.isAuth) return <Redirect to='/profile' />

  return (
    <>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
    </>
  )
}

export default connect(state => ({ isAuth: state.auth.isAuth, captchaURL: state.auth.captchaURL }),
  { login, logout })(Login)
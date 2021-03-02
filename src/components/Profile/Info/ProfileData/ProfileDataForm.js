import { Field, reduxForm } from "redux-form"
import { Input, Textarea } from "../../../common/FormsControls/FormsControls";
import styleError from '../../../Login/Login.module.css';
import style from './profileDataForm.module.css';
import { Checkbox } from 'antd';
import { Collapse } from 'antd';
const { Panel } = Collapse;


let ProfileDataForm = ({ handleSubmit, contacts, error, editMode }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        {error && <div className={styleError.formSummaryError}>{error}</div>}

        <div className={style.profileForm} value={editMode}>
          <Collapse defaultActiveKey={['1']}>
            <Panel key='1' header='info about me' className={style.infoAboutMe}>
              <div><b>Full Name</b></div>
              <Field placeholder='Enter your name' name='fullName' component={Input} />
              <div>Looking for a job:
              <Field name='lookingForAJob' component={Checkbox} type='checkbox' />
              </div>
              <div>My skills:
              <Field name='lookingForAJobDescription' component={Textarea} placeholder='skills' />
              </div>
              <div>About Me:
              <Field name='aboutMe' component={Textarea} placeholder='About Me' />
              </div>
            </Panel>
          </Collapse>
          <Collapse defaultActiveKey={['2']}>
            <Panel header='Contacts:' key='2' >
              <div className={style.contacts}>{contacts && Object.keys(contacts).map(key => {
                return <div key={key}> {key}: <Field placeholder={key} name={'contacts.' + key} component={Input} /> </div>
              })}
              </div>
            </Panel>
          </Collapse>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({ form: 'editProfile' })(ProfileDataForm);
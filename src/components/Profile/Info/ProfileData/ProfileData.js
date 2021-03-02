import style from './profileData.module.css';
import { Collapse, Button } from 'antd';
const { Panel } = Collapse;

let ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div className={style.profileData}>
      {isOwner && <div><Button type='primary' onClick={goToEditMode}>Edit</Button></div>}
      <Collapse defaultActiveKey={['1']} className={style.infoAboutMe}>
        <Panel key='1' header='info about me'>
          <div>About Me: {profile.aboutMe && profile.aboutMe}</div>
          <div>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
          {profile.lookingForAJob && <div>My skills: {profile.lookingForAJobDescription}</div>}
        </Panel>
      </Collapse>

      <Collapse className={style.contacts}>
        <Panel header='Contacts:'>
          {profile.contacts && Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
          })}
        </Panel>
      </Collapse>
    </div>
  )
}

let Contacts = ({ contactTitle, contactValue }) => {
  return contactValue ?
    <div>{`${contactTitle} : ${contactValue}`}</div> :
    <div>{`${contactTitle}: пока нет`}</div>

}

export default ProfileData;
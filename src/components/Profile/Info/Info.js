import React, { useState } from 'react';
import style from './Info.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import defaultPhoto from '../../../assets/img/icon.png';
import ProfileData from './ProfileData/ProfileData';
import ProfileDataForm from './ProfileData/ProfileDataForm';
import tryCatcher from '../../../utils/tryCatcher/tryCatcher';
import { UploadOutlined } from '@ant-design/icons';

function Info(props) {
  let [editMode, setEditMode] = useState(false);

  let onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  let onSubmit = (FormData) => {
    props.saveProfile(FormData).then(() => { setEditMode(false) })
  }

  return (
    <div className={style.info}>
      <div className={style.avatar}>
        <div className={style.fullName}>
          {props.profile.fullName}
        </div>
        <img src={tryCatcher(props.profile.photos, 'large') || defaultPhoto} alt="profile" />
        {(editMode && props.isOwner) && <div className={style.upload}>
          <input type='file' id='inputFile' onChange={onMainPhotoSelected} />
          <label for="inputFile">
            <span className={style.upload}>Upload new avatar <UploadOutlined /></span>
          </label>
        </div>}
        {!editMode && <ProfileStatus profile={props.profile} status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />}
      </div>

      <div className={style.blockAboutMe} value={editMode}>
        {(editMode && props.isOwner) ?
          <ProfileDataForm onSubmit={onSubmit} initialValues={props.profile} contacts={props.profile.contacts} editMode={editMode} />
          : <ProfileData goToEditMode={() => setEditMode(true)} profile={props.profile} isOwner={props.isOwner} />}
      </div>
    </div>
  )
}

export default Info;
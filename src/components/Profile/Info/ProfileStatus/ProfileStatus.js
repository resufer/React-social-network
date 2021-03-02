import { useEffect, useState } from 'react';
import style from './profileStatus.module.css'

let ProfileStatus = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status])

  return (
    <>
      {(editMode && props.isOwner) ?
        <div>
          <input onChange={(e) => setStatus(e.currentTarget.value)} autoFocus={true}
            value={status} onBlur={() => { setEditMode(false); props.updateStatus(status) }} />
        </div> :
        <div onDoubleClick={() => setEditMode(true)} className={style.profileStatus}>
          " {props.status || '------------'} "
        </div>
      }
    </>
  )
}

export default ProfileStatus;
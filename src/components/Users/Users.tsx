import React from 'react';
import style from './Users.module.css';
import { Pagination } from 'antd';
import User from './User/User';
import { UserType } from '../../types/types';

type PropsType = {
  currentPage: number
  totalUsersCount: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, onPageChanged, users, followingInProgress, unfollow, follow }) => {
  return <div className={style.allUsers}>
    <Pagination showQuickJumper defaultCurrent={currentPage}
      total={totalUsersCount} pageSizeOptions={['10']} onChange={onPageChanged} />

    <div className={style.usersOnPage}>
      {users.map(a => <User key={a.id} user={a}
        followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />)}
    </div>
  </div>
}

export default Users;
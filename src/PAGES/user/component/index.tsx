import { Fragment, lazy, memo } from 'react';

import UserBanner from './user-banner';

const PersonalInfo = lazy(() => import('./personal-info'));
// const UserBio = lazy(() => import('./biography'));
// const TutorOffered = lazy(() => import('./tutor-offered'));
const Profile = ({
  userInfo,
  handleManageInfo,
  // handleManageTutorInfo,
}: any) => {
  return (
    <Fragment>
      <UserBanner {...userInfo.data} is_loading={userInfo.is_loading} />
      <PersonalInfo
        {...userInfo.data}
        handleManageInfo={handleManageInfo}
        is_loading={userInfo.is_loading}
      />

      {/* {userInfo.data?.biography ? (
        <UserBio
          {...userInfo.data}
          handleManageInfo={handleManageTutorInfo}
          is_loading={userInfo.is_loading}
        />
      ) : null}
      {userInfo.data?.biography && userInfo.data?.tutor_completed ? (
        <TutorOffered
          {...userInfo.data}
          handleManageInfo={handleManageTutorInfo}
          is_loading={userInfo.is_loading}
        />
      ) : null} */}
    </Fragment>
  );
};

export default memo(Profile);

import { Button, Image } from 'react-vant';
import { UserO, AddO } from '@react-vant/icons';
import styles from './recommend-users.module.css';

const RecommendUsers = () => {
  // 模拟推荐用户数据
  const users = [
    {
      id: 1,
      username: '摄影师小李',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      followers: '2.3w',
      bio: '专业摄影师 | 城市风光',
      isFollowing: false,
      photos: 158
    },
    {
      id: 2,
      username: '旅行达人Amy',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      followers: '1.8w',
      bio: '环球旅行 | 美食探索',
      isFollowing: false,
      photos: 234
    },
    {
      id: 3,
      username: '美食记录者',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      followers: '3.1w',
      bio: '美食博主 | 生活美学',
      isFollowing: true,
      photos: 89
    }
  ];

  const handleFollow = () => {
    // TODO: 实现关注/取消关注逻辑
  };

  const handleUserClick = () => {
    // TODO: 跳转到用户主页
  };

  return (
    <div className={styles.usersContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <UserO className={styles.titleIcon} />
          <span>推荐关注</span>
        </div>
        <span className={styles.moreText}>查看更多</span>
      </div>
      
      <div className={styles.usersList}>
        {users.map(user => (
          <div key={user.id} className={styles.userItem}>
            <div className={styles.userInfo} onClick={() => handleUserClick(user)}>
              <Image
                round
                width="48"
                height="48"
                src={user.avatar}
                className={styles.userAvatar}
                fit="cover"
              />
              <div className={styles.userDetails}>
                <div className={styles.username}>{user.username}</div>
                <div className={styles.userBio}>{user.bio}</div>
                <div className={styles.userStats}>
                  {user.followers} 粉丝 · {user.photos} 作品
                </div>
              </div>
            </div>
            <Button
              size="small"
              type={user.isFollowing ? "default" : "primary"}
              className={styles.followBtn}
              onClick={() => handleFollow(user.id)}
              icon={!user.isFollowing ? <AddO /> : undefined}
            >
              {user.isFollowing ? '已关注' : '关注'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendUsers;
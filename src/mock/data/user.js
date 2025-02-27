import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.name(),
    addr: Mock.mock('@county(true)'),
    'age|18-30': 1,
    birth: Mock.Random.time(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };

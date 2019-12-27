
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const mockRoutes = {
  menuList: [
    {
      'children': [
        {
          // 'children': [],
          'parent_id': 1,
          'path': 'user',
          'menu_name': 'systemUser',
          'icon': '#',
          'perms': 'system:user:index',
          'order_num': 1,
          'menu_id': 4,
          'redirect': '/system/user',
          'name': 'systemUser',
          'url': '/system/user'
        },
        {
          'children': [
            {
              'create_time': '2018-12-28 10:50:28',
              'menu_type': 'C',
              'parent_id': 73,
              'path': 'person',
              'menu_name': 'system1Person',
              'icon': '#',
              'perms': 'system:person:index',
              'order_num': 1,
              'menu_id': 74,
              'redirect': '/system/system1/person',
              'name': 'system1Person',
              'url': '/system/system1/person'
            }
          ],
          'parent_id': 1,
          'path': 'system1',
          'menu_name': 'system1',
          'icon': '#',
          'perms': null,
          'order_num': 1,
          'menu_id': 73,
          'redirect': '/system/system1/person',
          'name': 'system1',
          'url': '/system/system1'
        }
      ],
      'redirect': '/system/user',
      'name': 'system',
      'parent_id': 0,
      'path': 'system',
      'menu_name': 'system',
      'icon': '#',
      'isRoot': true,
      'perms': null,
      'order_num': 2,
      'menu_id': 1,
      'url': '/system'
    },
    {
      'children': [
        {
          'parent_id': 2,
          'path': 'monitor',
          'menu_name': 'systemDataMonitor',
          'icon': '#',
          'perms': 'monitor:data:view',
          'redirect': '/systemData/monitor',
          'name': 'systemDataMonitor',
          'order_num': 3,
          'menu_id': 15,
          'url': '/systemData/monitor'
        }
      ],
      'redirect': '/systemData/monitor',
      'name': 'systemData',
      'parent_id': 0,
      'path': 'systemData',
      'menu_name': 'systemData',
      'isRoot': true,
      'icon': '#',
      'perms': null,
      'order_num': 5,
      'menu_id': 2,
      'url': '/systemData'
    }
  ]
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // getAuthMenu
  {
    url: '/user/getAuthMenu\.*',
    type: 'get',
    response: config => {
      // const { token } = config.query
      const info = mockRoutes
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  }
]

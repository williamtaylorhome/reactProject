## Project stack

node10.15.3 + react@16.12.0 + redux@3.7.2 + react-router@3.2.0 + webpack@4.41.2 + axios@0.19.0 + less@2.7.1 + antd@3.25.2

## Project operation

npm install (Install dependency packages)

npm start (Starting the service)

```

Final build command
```
npm run build (Formal environment packaged deployment)
npm run testing (Test environment packaging deployment command, can be modified according to specific requirements)

```

The data returned from the server is also in a standard json format, as follows

```
{
  data: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    'list': [
    ],
  },
  msg: '',
  status: 1,
}

```
All asynchronous requests will be processed by ajax.js in configs, and status will return 1 if there are no issues with the request;
If there is an error in the request, such as a parameter error or some other error, the status return value is 0.
If the status value is -1, the login time has expired, and the login is aborted.
These parameters can be adjusted according to the actual situation, and the error or success message is returned in msg.
The current project integrates complete user management, role management, module management and other basic rights management functions. You must also launch npm run mock to see it

In this react project, I have collaborated with the express framework of nodejs to develop the interface, which can output the real data of the database without relying on the backend. The warehouse address is at

```
https://github.com/williamtaylorhome/expressProject.git

```

## Notes

>  If you have any questions, please directly mention in the Issues, or you find the problem and have a very good solution, welcome PR 👍

### Example of canceling an http request：
```
import axios from 'axios'
const axiosHandle = axios.CancelToken.source()

login(){
  this.props.dispatch(fetchLogin(values, (res) => {},(error)=>{},axiosHandle)
  The action of canceling the request
  setTimeout(() => {
    axiosHandle.cancel('Cancel manually。')
  }, 3000)
}

```


## Function overview
- [√] Login, and login permission control
- [√] Project public npm module dll
- [√] redux complete demonstration
- [√] mockjs simulates backend return interface
- [√] Axios asynchronous request cross-domain settings
- [√] Real-time webpack package size preview for easy optimization
- [√] draftjs editor
- [√] cypress automated testing



## License
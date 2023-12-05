import { apiCall } from './config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useContext } from 'react'
import { UIContext } from 'src/usecontext/ui'

export const Login = async (data: ParsedUrlQuery) => {
  const options = {
    url: '/central/login-central',
    method: 'POST',
    data: data
  }
  console.log(options)
  return await apiCall(options)
    .then(result => {
      return result
    })
    .catch(e => {
      throw e
    })

  return
}

export async function Redirect(id: string, token: string) {
  const router = useRouter()
  const {openData}=useContext(UIContext)
  if (id != undefined && token != undefined) {
    console.log("services")
    console.log("id",id.toString())
    console.log("token",token.toString())
    // window.localStorage.setItem("id",id)

    const app = id
    if (app && token) {
      console.log("id",id)
      console.log("token",token)
      window.localStorage.setItem("token",token.toString())
      router.replace('/home/')
      openData()
      // try {
      //   const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API_CENTRAL}auth/verify-app-token`, {
      //     token:token.toString(),
      //     app:id.toString()
      //   }
      //     // headers:{
      //     //   Authorization:`Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2NGRjZTI5Yjk2ODMxNGEzNDM5MDllNDciLCJBcHAiOnsiMCI6eyJ1dWlkIjoiM2ZmNzgxNjYtZTEyMC00NTY1LWEwOTAtZTczYTE3YTI4NzY3IiwibmFtZSI6ImFjdGl2byIsInVybCI6Imh0dHA6Ly8xMC4xMC4yMTQuMjE5OjMwNTAvaG9tZSJ9fSwicm9sZXMiOlsiNjRiODU5NzgzZjMwNTJkZjNiNzI2ODBlIl0sImlhdCI6MTY5NjYwNDQzNiwiZXhwIjoxNjk2NjE4ODM2fQ.bffw5zbQ5R3JJK_TCv6H4_X0ODWIB0cRtRCjalFMl1o'}`
      //     // }
      //   )
      //   console.log("res",res.data)

      //   // localStorage.setItem('token', res.data)
      //   localStorage.setItem('token',res.data)
      //   // //router.replace('http://10.10.214.219:3050/home/')
      //   // router.replace('/home/')

      //   // if (!window.localStorage.getItem('token')) {
      //   //   router.push(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
      //   // }

      //   // if (res.status === 401 || res.status === 404) {
      //   //   router.push(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
      //   // }
      // } catch (error: any) {
      //   alert(error.response.data.message)
      //   // router.push(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
      // }
    } else {
      // router.push(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
    }
  }
}

// import { apiCall } from './config'
// import axios from 'axios'
// import { useRouter } from 'next/router'
// import { ParsedUrlQuery } from 'querystring'

// export const Login = async (data: ParsedUrlQuery) => {
//   const options = {
//     url: '/central/login-central',
//     method: 'POST',
//     data: data
//   }
//   console.log(options)
//   return await apiCall(options)
//     .then(result => {
//       console.log(result)

//       return result
//     })
//     .catch(e => {
//       console.log(e)
//       throw e
//     })

//   return
// }

// export async function Redirect(id: string, token: string) {
//   if (id != undefined && token != undefined) {
//     console.log('data: ' + id + ' ' + token)
//     const router = useRouter()
//     const app = id
//     // console.log(app)
//     console.log('app', app)
//     console.log('tokennnnnnn', token)

//     if (app && token) {
//       try {
//         const res = await axios.post('http://10.10.214.219:3300/api/central/login-central', { app, token })
//         localStorage.setItem('token', res.data)

//         if (res.status === 401 || res.status == 404) {
//           // console.log('errorrrrrrrrrrrr')
//           router.replace('http://10.10.214.223:3000/home')
//         }
//       } catch (error) {
//         router.push('http://10.10.214.223:3000/home')
//       }
//     } else {
//       // console.log('no existe tokennnnnnnnnnn')
//       router.replace('http://10.10.214.223:3000/home')
//     }
//   }
// }
// /* const router = useRouter()
//   const {id, token} = data
//   const app = id;
//   // console.log(app)
//   console.log('app',app)
//   console.log('tokennnnnnn',token)

//     if(app && token){
//       try {
//         const res = await axios.post('http://10.10.214.219:3300/api/central/login-central',{app,token})
//         localStorage.setItem('token', res.data)
//         if(res.status === 401){
//           // console.log('errorrrrrrrrrrrr')
//           router.push('http://10.10.214.223:3000/home')
//         }
//       } catch (error) {
//         router.push('http://10.10.214.223:3000/home')
//       }
//     }else{
//       console.log('no existe tokennnnnnnnnnn')
//       // router.push('http://10.10.214.223:3000/home')
//     } */

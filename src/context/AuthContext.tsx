// ** React Imports
import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import { RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

interface User{
  _id:string,
  name:string,
  lastName:string
  file:string
  ci:string
  // no es recomendable guardar la contraseña en el frontend
}
type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  users: User | null | undefined;
  accessToken:String | null

}
// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  users: null,
  accessToken:null
}


const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}


export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth Provider is missing");
  return context;
}



const AuthProvider = ({ children }: Props) => {
  // ** States

  const router = useRouter()


//NEW CODE
  const [accessToken, setAccessToken] = useState<string>("")
  const [users, setUsers] = useState<User |undefined>()


  useEffect(() => {
      checkAuth();
  }, [router.asPath]);
  const checkAuth = async() => {

    console.log("CheckAuth")
    // let { id, token } = router.query;
    // if(!id || !token){
    //   console.log('aaaaaaaaaaaaaaaatokennnnnn',id)
    //   const dataIdToken =await obtenerIdYTokenDesdeURL(router.asPath);
    //   id=dataIdToken.id as string
    //   token=dataIdToken.token as string
    // }
    const id=router.query.id
    const token=router.query.token


    console.log("id",id as string)
    console.log("token",token as string)
    // console.log(router.asPath)
    console.log(token,'tokennnnn')

    if (id && token) {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API_CENTRAL}`, {
          token:token as string,
          app:id as string
         })

          if (res.status === 401 || res.status === 404) {

            // router.push(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
          }
          console.log('errorrrrrrrrrrr',id)
          localStorage.setItem('token', res.data)





          router.replace('http://localhost:5000/home/')

          setAccessToken(res.data)
          saveSessionInfo(res.data)
      } catch (error:any) {
        alert(error.response.data.message)
        // router.push(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
       }



       const permissions = async (token: string) => {
        try {
          console.log("permissions: ",token)
          console.log('auth/decoded')

          window.localStorage.setItem('TokenLogin', token)
          // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_CENTRAL}auth/decoded`, {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_CENTRAL_DECO}auth/decoded`, {
            token: token
          })
          console.log('decoded token login roles: ' + response.data.id)

          const id = response.data.id
          window.localStorage.setItem('id', id)

          console.log('roles: ', response.data.roles)

          let permisos
          const permisosLista = []
          for (let j = 0; j < response.data.roles.length; j++) {
            permisos = response.data.roles[j].permissionName
            const keyPermisos = Object.keys(permisos)
            const permisosLength = keyPermisos.length
            console.log('length: ' + permisosLength)

            for (let i = 0; i < permisosLength; i++) {
              console.log('for: ' + i)
              try {
                console.log('auth/decoded')
                const respon = await axios.get(
              //  `${process.env.NEXT_PUBLIC_API_CENTRAL}permission/${response.data.roles[j].permissionName[i]}`
              `${process.env.NEXT_PUBLIC_URL_CENTRAL_DECO}permission/${response.data.roles[j].permissionName[i]}`
                )
                const activo=respon.data.permissionName.split('_')
                if(activo[0]==="ACTIVO")
                {
                  permisosLista.push(respon.data.permissionName)
                }

              } catch (error) {
                console.log(error)
              }
            }
          }

          const arrayPermisos = JSON.stringify(permisosLista)
          window.localStorage.setItem('permisos', arrayPermisos)
          console.log('permisos' + arrayPermisos)
        } catch (error) {
          console.log(error)
        }
      }
      permissions(token as string)
    }else{
      // console.log(id, token)
      const token = await localStorage.getItem("token")
      if(!token){
        // router.replace(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
      } else {
        await setAccessToken(token);
        await saveSessionInfo(token);
      }
    }
  }


  const saveSessionInfo = async(token: string) => {
      try {
         const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_CENTRAL_DECO}auth/decoded`,{token:token})
        //const res = await axios.post(`http://10.10.214.151:3110/auth/decoded`,{token})<
        const userInfo = await getUserInfo(res.data.idUser)
        setUsers(userInfo)
      } catch (error) {
        console.log(error)
      }

  }

  const getUserInfo = async(id:string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_PERSONAL}api/personal/${id}`)
    //const res = await axios.get(`http://10.10.214.151:4200/personal}${id}`)

    return res.data
  }

//FINISHED CODE







  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)


  // ** Hooks

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {


  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    // router.push('/login')
    router.push(`${process.env.NEXT_PUBLIC_URL_CENTRAL}/login`)
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user: {"id":1,"usepage":"use-page-frontend","fullName":"John Doe","username":"johndoe","email":"admin@materialize.com"} as any,
    loading:false,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    users,
    accessToken
  }

  return <AuthContext.Provider value={values}>
    {children}
    </AuthContext.Provider>
}

export { AuthContext, AuthProvider }

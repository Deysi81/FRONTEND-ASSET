// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import { Login, Redirect } from 'src/services/services'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'


const Home = () => {
  // const router = useRouter()

  // const id = router.query.id
  // const token = router.query.token

  // const permissions = async (token: string) => {
  //   try {
  //     console.log("permissions: ",token)
  //     console.log('auth/decoded')

  //     window.localStorage.setItem('TokenLogin', token)
  //     // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_CENTRAL}auth/decoded`, {
  //       const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_CENTRAL_DECO}auth/decoded`, {
  //       token: token
  //     })
  //     console.log('decoded token login roles: ' + response.data.id)

  //     const id = response.data.id
  //     window.localStorage.setItem('id', id)

  //     console.log('roles: ', response.data.roles)

  //     let permisos
  //     const permisosLista = []
  //     for (let j = 0; j < response.data.roles.length; j++) {
  //       permisos = response.data.roles[j].permissionName
  //       const keyPermisos = Object.keys(permisos)
  //       const permisosLength = keyPermisos.length
  //       console.log('length: ' + permisosLength)

  //       for (let i = 0; i < permisosLength; i++) {
  //         console.log('for: ' + i)
  //         try {
  //           console.log('auth/decoded')
  //           const respon = await axios.get(
  //         //  `${process.env.NEXT_PUBLIC_API_CENTRAL}permission/${response.data.roles[j].permissionName[i]}`
  //         `${process.env.NEXT_PUBLIC_URL_CENTRAL_DECO}permission/${response.data.roles[j].permissionName[i]}`
  //           )
  //           const activo=respon.data.permissionName.split('_')
  //           if(activo[0]==="ACTIVO")
  //           {
  //             permisosLista.push(respon.data.permissionName)
  //           }

  //         } catch (error) {
  //           console.log(error)
  //         }
  //       }
  //     }

  //     const arrayPermisos = JSON.stringify(permisosLista)
  //     window.localStorage.setItem('permisos', arrayPermisos)
  //     console.log('permisos' + arrayPermisos)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }



  // if (id && token) {
  //   console.log("id",id)
  //   // Redirect(id.toString(), token.toString())
  // }
  // useEffect(()=>{
  //   const myArray = [];
  //   myArray.push("hghj")
  //   myArray.push("hgbugyughj")
  //   myArray.push("hghj")
  //   myArray.push("fcycytc")
  //   Item('prueba',JSON.stringify(myArray))
  // },[])



  // const getDataLogin = async () => {
  //   const form = {
  //     email: 'string@gmail.com',
  //     password: '12345678'
  //   }


  //   //alert(process.env.NEXT_PUBLIC_API_PERSONAL)
  //   await Login(form)
  //     .then(result => {
  //       alert(JSON.stringify(result))
  //       localStorage.setItem('token', result.response.token)
  //       window.localStorage.setItem('prueba',JSON.stringify(["hola","prueba","tres"]))
  //     })
  //     .catch(e => {
  //       alert(JSON.stringify(e))
  //     })
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Button >CLICK</Button>
        <Card>
          <CardHeader title='SISTEMA DE CONTROL DE ACTIVOS PARA LA CIUDAD DE POTOSI 🚀'></CardHeader>
          <CardContent>
          <img  src="/images/logos/logo 2-red.png" alt="Marca de agua" style={{ position: 'absolute', opacity: '0.5',width: '700px',top: '5%',left: '27%' }} />
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
            Explora nuestra plataforma diseñada para potenciar la gestión eficiente y transparente de los valiosos recursos en esta ciudad rica en historia y cultura. Te invitamos a descubrir cómo nuestro sistema facilita el manejo inteligente de activos, contribuyendo al desarrollo sostenible y al resguardo del patrimonio potosino. ¡Comienza tu viaje hacia una administración más efectiva y conectada con nuestra invaluable herencia!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {/* <Card>
          <CardHeader title='ACL and JWT 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
          </CardContent>
        </Card> */}
      </Grid>
    </Grid>
  )
}

export default Home

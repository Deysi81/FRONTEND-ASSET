// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Button, Divider } from '@mui/material'
import { Login, Redirect } from 'src/services/services'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from 'axios'
import { json } from 'stream/consumers'
import { makeStyles } from '@mui/styles';


const Home = () => {
  const router = useRouter()

  const id = router.query.id
  const token = router.query.token

  console.log("token",token?.toString())
  console.log("id",id?.toString())
  const permissions = async (token: string) => {
    try {
      console.log('auth/decoded')

      // window.localStorage.setItem('TokenLogin', token)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API_CENTRAL}auth/decoded`, {
        token: token
      })
      // console.log('id User: ' + response.data.idUser)

      // const id = response.data.idUser.toString()
      // window.localStorage.setItem('id', response.data.idUser.toString())

      console.log('roles: ', response.data.roles)

      let permisos
      const permisosLista = []
      for (let j = 0; j < response.data.roles.length; j++) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_API_CENTRAL}rol/${response.data.roles[j]}`)
        // permisos = response.data.roles[j].permissionName
        console.log("res: ", res.data)
        permisos = res.data.permissionName
        const keyPermisos = Object.keys(permisos)
        const permisosLength = keyPermisos.length
        console.log('length: ' + permisosLength)

        for (let i = 0; i < permisosLength; i++) {
          // console.log('for: ' + i)
          // try {
          //   console.log('auth/decoded')
          //   const respon = await axios.get(
          //     ${process.env.NEXT_PUBLIC_API_CENTRAL}permission/${response.data.roles[j].permissionName[i]}
          //   )
          //   permisosLista.push(respon.data.permissionName)
          console.log("permiso: ", permisos[i].permissionName)
          const personal = permisos[i].permissionName.split('_')
          if (personal[0] === "ACTIVO") {
            permisosLista.push(permisos[i].permissionName)
          }

          // } catch (error) {
          //   console.log(error)
          // }
        }
      }

      const arrayPermisos = JSON.stringify(permisosLista)
      window.localStorage.setItem('permisos', arrayPermisos)
      console.log('permisos' + arrayPermisos)

    } catch (error) {
      console.log(error)
    }
  }


  if (id && token) {
    console.log("id",id)
    const newId=JSON.stringify(id)
    // window.localStorage.setItem('id', newId)
    // window.localStorage.setItem('token',token[0])
    permissions(token.toString())
    Redirect(id.toString(), token.toString())

  }
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
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    card: {
      width: '100%',
      margin: 'auto',
    },
    image: {
      maxWidth: ' 43%',
      height: 'auto',
    },
  }));


    const classes = useStyles();

    return (
      <Grid container spacing={6}>
        {/* <Grid item xs={12}>

          <Card>
            <CardHeader title='SISTEMA DE CONTROL DE ACTIVOS PARA LA CIUDAD DE POTOSI 🚀'></CardHeader>
            <CardContent>
            <img  src="/images/logos/logo 2-red.png" alt="Marca de agua" style={{ position: 'absolute', opacity: '0.5',width: '500px',top: '25%',left: '35%' }} />
              <Typography>
              Explora nuestra plataforma diseñada para potenciar la gestión eficiente y transparente de los valiosos recursos en esta ciudad rica en historia y cultura. Te invitamos a descubrir cómo nuestro sistema facilita el manejo inteligente de activos, contribuyendo al desarrollo sostenible y al resguardo del patrimonio potosino. ¡Comienza tu viaje hacia una administración más efectiva y conectada con nuestra invaluable herencia!
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={12}>
        <Grid item xs={12}>
        <Card>
            <CardHeader style={{textAlign:'center'}} title='SISTEMA DE CONTROL DE ACTIVOS PARA LA CIUDAD DE POTOSI 🚀'></CardHeader>
            <CardContent>
            <Typography>
              Explora nuestra plataforma diseñada para potenciar la gestión eficiente de Activos.¡Comienza tu viaje hacia una administración más efectiva!
              </Typography></CardContent>
          {/* </Card>
            <Card sx={{ width: '100%', maxWidth: '100%', margin: 'auto' }}> */}
             <Divider sx={{ my: 2, borderBottomWidth: '2px' }} />

              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pt: '10px'
                  }}
                >
                  <img
                    className={classes.image}
                    src="/images/logos/logo_black.png"
                    alt="Descripción del Logo"
                  />
                </Box>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  export default Home


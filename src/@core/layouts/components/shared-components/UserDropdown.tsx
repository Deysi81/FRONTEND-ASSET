// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import axios from 'axios'
import { useAuthContext } from 'src/context/AuthContext'

interface Props {
  settings: Settings
}


const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {

  const [image,setImage]=useState<string>("")
  const { users } = useAuthContext()
  console.log(users?.file)

  const { settings } = props

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)


  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  useEffect(() => {
    const get = async () => {
      console.log(users?.file)
      if (users?.file ) {
        try {
          console.log('entra')
          const data = await axios.get(`${process.env.NEXT_PUBLIC_API_FILE}${users?.file}`)
          setImage(data.data)
        } catch (error: any) {
          console.log("error", error)
        }
      }
      // console.log('no entra')
    }
    get()
  }, [])

  // `${process.env.NEXT_PUBLIC_API_CENTRAL}user/${id}`


  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }



  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }
  const convertBase64ToImageUrl = (base64String: string) => {
    return `data:image/png;base64,${base64String}`
  }

  // const convertBase64toImagen = (image64: string) => {
  //   return data:image/png;base64,${image64}
  // }
  // if (file) {
  //   axios.get(${process.env.NEXT_PUBLIC_API_FILE}${file}).then(response => {
  //     setImage64(response.data.file.base64)
  //   })
  // }

  return (
    <Fragment>
     <Box marginBottom={-2}>
    <Box marginBottom={5}>
    <Typography> {'  '}</Typography>
    </Box>
    <Box>
<Typography
  variant='body2'
  sx={{
    textAlign: 'center',
    fontFamily: 'NuevaFuente, sans-serif',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }}>
  {users?.name} {users?.lastName}
  {/* {user?.name} */}
</Typography>
<Typography variant='body2' sx={{ textAlign: 'center', fontFamily: 'NuevaFuente, sans-serif' }}>
  {users?.ci}
</Typography>
      </Box>

      </Box>


      {/* <Typography style={{  color: 'gray',fontSize:'15px',fontWeight: 'bold'}}>
        NOMBRE: {''}
      </Typography>
<Typography style={{  color: 'gray',fontSize:'15px'}}>
         {users?.name} {users?.lastName}
      </Typography> */}

      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='JohNNn Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          // src={users?.file}
          src={convertBase64ToImageUrl(image)}
        />
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src={convertBase64ToImageUrl(image)} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}> {users?.name} {users?.lastName} </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
              CI: {users?.ci}
              </Typography>
            </Box>
          </Box>
        </Box>
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Cerrar sesion
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
